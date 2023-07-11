const { google } = require("googleapis");
const { oAuth2Client } = require("../config/auth");

const getEvents = async (req, res) => {
  try {
    // Criação do cliente do Google Calendar
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const calendarId = req.query.calendarId;

    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setDate(maxDate.getDate() + 6);
    maxDate.setHours(23, 59, 59);

    // Consulta dos eventos no Google Calendar
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: minDate.toISOString(),
      timeMax: maxDate.toISOString(),
    });

    const events = response.data.items;

    res.json(events);
  } catch (error) {
    console.error("Erro ao consultar eventos:", error);
    res.status(500).send("Erro ao consultar eventos.");
  }
};

const confirmEvent = async (req, res) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const eventId = req.query.eventId;
    const calendarId = req.query.calendarId;
    const description = req.query.description;

    const response = await calendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    });
    const existingEvent = response.data;

    const updatedEvent = {
      ...existingEvent,
      summary: "Horário marcado",
      description: description,
      colorId: "4",
    };

    const responseUpdate = calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: updatedEvent,
    });

    res.send({
      msg: "Evento atualizado com sucesso",
      updatedEvent: responseUpdate.data,
    });
  } catch (error) {
    console.error("Ocorreu um erro ao atualizar o evento:", error);
    res.status(500).send("Erro ao atualizar o evento");
  }
};

const deleteEvent = async (req, res) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const eventId = req.query.eventId;
    const calendarId = req.query.calendarId;

    const response = await calendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    });
    const existingEvent = response.data;

    const updatedEvent = {
      ...existingEvent,
      summary: "Livre",
      description: "Livre",
      colorId: "2",
    };

    const responseUpdate = calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: updatedEvent,
    });

    res.send({
      msg: "Evento atualizado com sucesso",
      updatedEvent: responseUpdate.data,
    });
  } catch (error) {
    console.error("Ocorreu um erro ao atualizar o evento:", error);
    res.status(500).send("Erro ao atualizar o evento");
  }
};

const getCallback = async (req, res) => {
  const code = req.query.code;

  try {
    // Configurar o token de acesso no cliente OAuth2
    const { tokens } = await oAuth2Client.getToken(code);
    accessToken = tokens.access_token;
    oAuth2Client.setCredentials(tokens);
  } catch (error) {
    console.error("Erro ao obter token de acesso:", error);
  }

  res.send("Autorização concluída. Você pode fechar esta página.");
};

module.exports = {
  getEvents,
  confirmEvent,
  deleteEvent,
  getCallback,
};
