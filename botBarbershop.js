const qrcode = require("qrcode-terminal");
const { getReply } = require("./src/scripts/getReply");
const express = require("express");
const { authUrl } = require("./src/config/auth");
const { client } = require("./src/config/wwebjs");
const { validateMessage } = require("./src/businessLogic");
const {
  getEvents,
  confirmEvent,
  deleteEvent,
  getCallback,
} = require("./src/routes");
const { formatToNumber } = require("./src/shared/formatters");
const app = express();

require("dotenv").config();

// PORTA ONDE O SERVIÇO SERÁ INICIADO
const port = process.env.PORT;

// Rota inicial para redirecionar para a página de autorização
app.get("/", (req, res) => {
  res.redirect(authUrl);
});

// Rota de callback para receber o código de autorização e trocar pelo token de acesso
app.get("/callback", getCallback);

// Rota para consultar os eventos dos próximos 5 dias
app.get("/events", getEvents);

// Rota para confirmar agendamento
app.get("/confirm", confirmEvent);

// Rota para cancelar agendamento
app.get("/delete", deleteEvent);

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Gerar QR code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR RECEIVED", qr);
});

// Bot conectado
client.on("ready", () => {
  console.log("Client is ready!");
  dataValidacao = new Date();
});

// Inicializa o Bot
client.initialize();

// Escuta mensagens recebidas
client.on("message", async (msg) => {
  const isValidMessage = validateMessage(msg);

  if (isValidMessage === true) {
    console.log("Mensagem recebida: ", msg.body);
    const user = {
      keyword: msg.body.toLowerCase(),
      chatId: msg.from,
      name: msg._data.notifyName,
      phoneNumber: formatToNumber(msg.from),
    };

    const messageReply = await getReply(user, client);
    if (messageReply) {
      console.log("Resposta: ", messageReply);
      client.sendMessage(msg.from, messageReply);
    }
  }
});
