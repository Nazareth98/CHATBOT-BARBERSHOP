const { getData } = require("../../database/getData");

const getAllEvents = async (calendarId) => {
  let eventsArray = [];

  try {
    const response = await fetch(
      `http://localhost:8080/events?calendarId=${calendarId}`
    );
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      eventsArray.push({
        index: i,
        id: data[i].id,
        date: data[i].start.dateTime,
        summary: data[i].summary,
        description: data[i].description,
      });
    }
    return eventsArray;
  } catch (error) {
    console.log("Erro ao buscar eventos: ", error);
  }
};

const getClientEvent = async (user) => {
  const barbers = await getData("barbeiros");
  let event = {};
  for (let i = 0; i < barbers.length; i++) {
    let calendarId = barbers[i].data.calendarId;
    let eventsArray = await getAllEvents(calendarId);

    for (let j = 0; j < eventsArray.length; j++) {
      if (eventsArray[j].description.includes(user.phoneNumber)) {
        event = eventsArray[j];
        event.barberChatId = barbers[i].data.chatId;
        event.calendarId = barbers[i].data.calendarId;
        break;
      }
    }
  }
  return event;
};

const deleteEvent = async (event) => {
  try {
    const eventId = event.id;
    const calendarId = event.calendarId;
    await fetch(
      `http://localhost:8080/delete?eventId=${eventId}&calendarId=${calendarId}`
    )
      .then((response) => response.json())
      .then((data) => console.log(">>> Evento deletado com sucesso "))
      .catch((error) => {
        console.error("Erro ao deletar os eventos:", error);
      });
  } catch (error) {
    console.error("Erro ao deletar os eventos:", error);
  }
};

const confirmEvent = async (schedule) => {
  try {
    let eventId = schedule.data.date.id[0];
    let calendarId = schedule.data.barber.data.calendarId;
    let description = `Cliente: ${schedule.data.client.data.name} Serviço: ${schedule.data.service.data.name} Contato: ${schedule.data.client.data.phoneNumber}`;
    await fetch(
      `http://localhost:8080/confirm?eventId=${eventId}&calendarId=${calendarId}&description=${description}`
    );
    console.log("Evento confirmado");
  } catch (error) {
    console.error("Erro ao atualizar o evento:", error);
  }
};

module.exports = {
  getAllEvents,
  getClientEvent,
  deleteEvent,
  confirmEvent,
};
