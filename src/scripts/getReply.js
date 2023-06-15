const { isRegistered } = require("./isRegistered");
const { formatedWorkingDays } = require("../services/getWorkingDays");
const { getData, getSchedule } = require("../database/getData");
const { cancelSchedule } = require("./cancelSchedule");
const { createSchedule } = require("../database/createData");
const { updateSchedule } = require("../database/updateData");
const { confirmSchedule } = require("./confirmSchedule");
const { formatDayOfWeek } = require("./formatDate");
const moment = require("moment");

const getReply = async (user, eventsArr) => {
  const services = await getData("servicos");
  const barbers = await getData("barbeiros");
  let schedule = await getSchedule(user);
  await isRegistered(user);

  let listWorkingDays = await formatedWorkingDays();

  console.log("mensagem recebida:", user.keyword);

  let reply = "";

  if (user.keyword === "0") {
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
      nextDays = [];
      for (let i = 0; i < 7; i++) {
        let Day = new Date();
        let data = moment(Day);
        let j = i;
        let formatedDate = data.format("YYYY-MM-DDTHH:mm:ssZ");

        console.log("como esta retornando formatedDate:" + formatedDate);
        if (Day.getDay() + i > 6) {
          j = i - 7;
        }

        console.log("esse é o valor de j: ", j);
        let dayOfMonth = Day.getDate() + i;
        let dayOfWeek = Day.getDay() + j;
        if (dayOfWeek !== 0) {
          nextDays.push({
            Date: formatedDate,
            dayOfWeek: formatDayOfWeek(dayOfWeek.toString()),
            dayOfMonth: dayOfMonth,
          });
        }
      }

      for (let i = 0; i < nextDays.length; i++) {
        reply += `\n*[${i + 1}]* - ${nextDays[i].dayOfWeek}, dia ${
          nextDays[i].dayOfMonth
        }`;
      }
      reply += "\n\n*[0]* - Cancelar agendamento";
      return reply;
    } else if (schedule.data.service !== null) {
      await updateSchedule(user, "dayOfWeek");
      reply = `${user.name}, escolha um dos próximos horários disponíves:\n\n`;
      for (let i = 0; i < eventsArr.length; i++) {
        if (eventsArr[i].summary === "Livre") {
          reply += `\n*[${i + 1}]* - ${eventsArr[i].date}`;
        }
      }
      reply += "\n\n*[0]* - Cancelar agendamento";
      return reply;
    } else if (schedule.data.date === null) {
      await updateSchedule(user, "date", eventsArr);
      schedule = await getSchedule(user);
      reply = `Para confirmar o agendamento de *${schedule.data.service.data.name}* com o barbeiro *${schedule.data.barber.data.name}* para a data *${schedule.data.date.data}* responda com a opção *[1]*!\n\n*[1]* - Confirmar agendamento`;
      reply += "\n\n*[0]* - Cancelar agendamento";
      return reply;
    } else if (
      schedule.data.date !== null &&
      schedule.data.service !== null &&
      schedule.data.barber !== null
    ) {
      schedule = await getSchedule(user);
      confirmSchedule(schedule);
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
