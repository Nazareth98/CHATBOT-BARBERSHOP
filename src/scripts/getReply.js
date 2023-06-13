const { isRegistered } = require("./isRegistered");
const { formatedWorkingDays } = require("../services/getWorkingDays");
const { getData, getSchedule } = require("../database/getData");
const { cancelSchedule } = require("./cancelSchedule");
const { createSchedule } = require("../database/createData");
const { updateSchedule } = require("../database/updateData");

const getReply = async (user, calendar, createEvents) => {
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

  if (user.keyword === "criar") {
    await createEvents();
    return "Criado com sucesso";
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
    } else {
      await updateSchedule(user, "service");
      let nextScheduleTime = [];
      reply = `${user.name}, escolhe um dos próximos horários disponíves:\n\n`;
      for (let i = 0; i < calendar.length; i++) {
        if (calendar[i].description === "Livre") {
          nextScheduleTime.push({ date: calendar[i].start.dateTime });
          reply = `${reply}\n*[${i + 1}]* - ${calendar[i].start.dateTime}`;
        }
      }
      reply += "\n\n*[0]* - Cancelar agendamento";
    }
  } else {
    createSchedule(user, schedule);
    reply = `Olá ${user.name}! Tudo certo?\nPara agendar atendimento, escolha primeiro um de nossos barbeiros!\n\n`;
    for (let i = 0; i < barbers.length; i++) {
      reply += `\n*[${i + 1}]* - ${barbers[i].data.name}`;
    }
    reply += "\n\n*[0]* - Cancelar agendamento";
  }
  return reply;
};

module.exports = {
  getReply,
};
