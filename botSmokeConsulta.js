const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// PORTA ONDE O SERVIÇO SERÁ INICIADO
const port = 8001;
const idClient = "bot-Barber";

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
client.on("message", (message) => {
  console.log(message.body);

  client.sendMessage(message.from, "TA FUNCIONANDO CARALHO");
});
