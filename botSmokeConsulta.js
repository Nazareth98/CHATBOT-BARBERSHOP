const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { formatToNumber } = require("./src/scripts/formatObjects");
const { getReply } = require("./src/scripts/getReply");
const {
  mybusinessnotifications,
} = require("googleapis/build/src/apis/mybusinessnotifications");
const express = require("express");
const { google } = require("googleapis");
const app = express();

// PORTA ONDE O SERVIÇO SERÁ INICIADO
const idClient = "bot-Barber";
const port = 8080;

let schedules;

const credentials = {
  client_id:
    "724978031851-2us75thhck9fr7cdpl81tb58gr9fnptf.apps.googleusercontent.com",
  client_secret: "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",
  redirect_uri: "http://localhost:8080/callback",
};

// Configurações do escopo e token de acesso
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Criação do cliente OAuth2
const oAuth2Client = new google.auth.OAuth2({
  clientId: credentials.client_id,
  clientSecret: credentials.client_secret,
  redirectUri: credentials.redirect_uri,
});

// Gere a URL de autorização
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

// Rota inicial para redirecionar para a página de autorização
app.get("/", (req, res) => {
  res.redirect(authUrl);
});

// Rota de callback para receber o código de autorização e trocar pelo token de acesso
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    accessToken = tokens.access_token;

    // Configurar o token de acesso no cliente OAuth2
    oAuth2Client.setCredentials(tokens);

    // Agora você tem o token de acesso e pode usá-lo para consultar eventos no Google Calendar

    // Exemplo de código para consulta de eventos:
    await fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then((data) => {
        // Manipule os dados dos eventos aqui
        console.log(data);
        schedules = data;
      })
      .catch((error) => {
        console.error("Erro ao buscar os eventos:", error);
      });
  } catch (error) {
    console.error("Erro ao obter token de acesso:", error);
  }

  res.send("Autorização concluída. Você pode fechar esta página.");
});

// Rota para consultar os eventos dos próximos 5 dias
app.get("/events", async (req, res) => {
  try {
    // Criação do cliente do Google Calendar
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    // Data mínima para consulta (a partir de hoje)
    const minDate = new Date();

    // Data máxima para consulta (5 dias no futuro)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5); // Adiciona 5 dias para incluir os próximos 5 dias
    maxDate.setHours(23, 59, 59); // Define o horário para o final do dia

    // Consulta dos eventos no Google Calendar
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: minDate.toISOString(),
      timeMax: maxDate.toISOString(),
    });

    const events = response.data.items;

    res.json(events);
  } catch (error) {
    console.error("Erro ao consultar eventos:", error);
    res.status(500).send("Erro ao consultar eventos.");
  }
});

// Rota para criar um novo evento
app.post("/events", async (req, res) => {
  try {
    // Criação do cliente do Google Calendar
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    // Dados do novo evento (altere conforme necessário)
    const event = {
      summary: "Novo Evento",
      start: {
        dateTime: "2023-06-30T10:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2023-06-30T12:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    };

    // Criação do evento no Google Calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    const createdEvent = response.data;

    res.json(createdEvent);
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).send("Erro ao criar evento.");
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const client = new Client({
  authStrategy: new LocalAuth({ clientId: idClient }),
  puppeteer: {
    headless: true,

    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
  },
});

// Gerar QR code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR RECEIVED", qr);
});

// Bot conectado
client.on("ready", () => {
  console.log("Client is ready!");
});

// Inicializa o Bot
client.initialize();

// Escuta mensagens recebidas
client.on("message", async (msg) => {
  // Transforma número em ID cadastrado no BD
  const user = {
    keyword: msg.body.toLocaleLowerCase(),
    chatId: msg.from,
    name: msg._data.notifyName,
    phoneNumber: formatToNumber(msg.from),
  };

  if (msg.from.includes("@g.us")) {
    return false;
  } else {
    const messageReply = await getReply(user, schedules);
    console.log(messageReply);
    if (messageReply) {
      client.sendMessage(msg.from, messageReply);
    }
  }
});
