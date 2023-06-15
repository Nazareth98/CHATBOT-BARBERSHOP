const { isRegistered } = require("./isRegistered");
const { formatedWorkingDays } = require("../services/getWorkingDays");
const { getData, getSchedule } = require("../database/getData");
const { cancelSchedule } = require("./cancelSchedule");
const { createSchedule } = require("../database/createData");
const { updateSchedule } = require("../database/updateData");
const { confirmSchedule } = require("./confirmSchedule");
const { formatDayOfWeek } = require("./formatDate");
const { formatHour } = require("./formatHour");
const moment = require("moment");
const { getNextDays } = require("./getNextDays");
const { deleteSchedule } = require("../database/deleteData");
const { formatDayHour } = require("./formatDayHour");
const { getEvents } = require("./getEvents");

let eventsArr = [];

const getReply = async (user) => {
  const services = await getData("servicos");
  const barbers = await getData("barbeiros");
  let schedule = await getSchedule(user);
  await isRegistered(user);

  let listWorkingDays = await formatedWorkingDays();

  console.log("mensagem recebida:", user.keyword);

  let reply = "";

  if (user.keyword === "0") {
    await deleteSchedule(user);
    return cancelSchedule(user);
  }

  if (schedule !== null) {
    if (schedule.data.barber === null) {
      await updateSchedule(user, "barber");
      schedule = await getSchedule(user);
      reply = `${user.name}, para realizar o agendamento com o barbeiro *${schedule.data.barber.data.name}* selecione uma das seguintes opções:\n\n`;
      for (let i = 0; i < services.length; i++) {
        reply += `\n*[${i + 1}]* - ${services[i].data.name}`;
      }
      reply += "\n\n*[0]* - Cancelar agendamento";
      return reply;
    } else if (schedule.data.service === null) {
      await updateSchedule(user, "service");
      schedule = await getSchedule(user);
      reply = `Selecione o dia de prefrência:\n\n`;
      nextDays = getNextDays();

      for (let i = 0; i < nextDays.length; i++) {
        reply += `\n*[${i + 1}]* - ${nextDays[i].dayOfWeek}, dia ${
          nextDays[i].dayOfMonth
        }`;
      }
      reply += "\n\n*[0]* - Cancelar agendamento";
      return reply;
    } else if (schedule.data.date === null) {
      await updateSchedule(user, "dayOfWeek");
      schedule = await getSchedule(user);
      eventsArr = await getEvents(schedule);
      console.log("eventsArr: ", eventsArr);
      let selectedDay = schedule.data.date.dayOfWeek.dayOfMonth.toString();
      reply = `${user.name}, escolha um dos próximos horários disponíves:\n\n`;
      for (let i = 0; i < eventsArr.length; i++) {
        if (
          eventsArr[i].summary === "Livre" &&
          eventsArr[i].date.slice(8, 10) === selectedDay
        ) {
          reply += `\n*[${i + 1}]* - ${formatHour(eventsArr[i].date)}`;
        }
      }
      reply += "\n\n*[0]* - Cancelar agendamento";
      return reply;
    } else if (schedule.data.date.hasOwnProperty("dayOfWeek")) {
      eventsArr = await getEvents(schedule);
      await updateSchedule(user, "date", eventsArr);
      schedule = await getSchedule(user);
      reply = `Para confirmar o agendamento de *${
        schedule.data.service.data.name
      }* com o barbeiro *${
        schedule.data.barber.data.name
      }* para a data *${formatDayHour(
        schedule.data.date.data
      )}* responda com a opção *[1]*!\n\n*[1]* - Confirmar agendamento\n\n*[0]* - Cancelar agendamento`;
      return reply;
    } else if (
      schedule.data.date !== null &&
      schedule.data.service !== null &&
      schedule.data.barber !== null
    ) {
      schedule = await getSchedule(user);
      deleteSchedule(user);
      confirmSchedule(schedule);
      reply = `Tudo certo, só comparecer na data escolhida!`;
      return reply;
    }
  } else {
    createSchedule(user, schedule);
    reply = `Olá ${user.name}! Tudo certo?\nPara agendar atendimento, escolha primeiro um de nossos barbeiros!\n\n`;
    for (let i = 0; i < barbers.length; i++) {
      reply += `\n*[${i + 1}]* - ${barbers[i].data.name}`;
    }
    reply += "\n\n*[0]* - Cancelar agendamento";
    return reply;
  }
  return false;
};

module.exports = {
  getReply,
};
