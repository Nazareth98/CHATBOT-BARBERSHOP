const { getAllEvents } = require("../controllers/events");
const { getData } = require("../database/getData");

const validateMessage = (msg) => {
  let isValidMessage = true;

  if (msg.isGroup) {
    isValidMessage = false;
    console.log("Mensagem ignorada: originada de grupo");
  }

  if (msg.isMedia) {
    isValidMessage = false;
    console.log("Mensagem ignorada: mensagem é um arquivo de midia");
  }

  if (
    msg.type === "sticker" ||
    msg.type === "video" ||
    msg.type === "image" ||
    msg.type === "gif" ||
    msg.type === "document" ||
    msg.type === "audio"
  ) {
    isValidMessage = false;
    console.log("Mensagem ignorada: mensagem não é um formato válido");
  }

  if (msg.from.includes("status")) {
    isValidMessage = false;
    console.log("Mensagem ignorada: mensagem não é um status");
  }

  return isValidMessage;
};

const validateUser = (user) => {
  let name = user.name;
  let isValidUser = false;
  if (name) {
    isValidUser = true;
  }
  return isValidUser;
};

const validateClient = async (user) => {
  const clients = await getData("clientes");
  let clientExist = false;

  for (let i = 0; i < clients.length; i++) {
    if (clients[i].data.phoneNumber === user.phoneNumber) {
      clientExist = true;
      break; // Se encontrou um cliente correspondente, interrompe o loop
    }
  }

  return clientExist;
};

const checkEventExist = async (user) => {
  const barbers = await getData("barbeiros");
  let eventExist = false;
  for (let i = 0; i < barbers.length; i++) {
    let calendarId = barbers[i].data.calendarId;
    let eventsArray = await getAllEvents(calendarId);

    for (let j = 0; j < eventsArray.length; j++) {
      if (eventsArray[j].description.includes(user.phoneNumber)) {
        eventExist = true;
      }
    }

    if (eventExist) {
      break;
    }
  }

  return eventExist;
};

const checkScheduleExist = async (user) => {
  const schedules = await getData("agendamentos");
  let scheduleExist = false;
  if (schedules.length > 0) {
    for (let i = 0; i < schedules.length; i++) {
      if (
        schedules[i].data.client !== null &&
        schedules[i].data.client !== undefined &&
        schedules[i].data.client.data.phoneNumber === user.phoneNumber
      ) {
        scheduleExist = true;
        break;
      }
    }
  }
  return scheduleExist;
};

module.exports = {
  validateMessage,
  validateUser,
  validateClient,
  checkEventExist,
  checkScheduleExist,
};
