const { isRegistered } = require("./isRegistered");
const { formatedWorkingDays } = require("../services/getWorkingDays");
const { getData, getSchedule } = require("../database/getData");
const { cancelSchedule } = require("./cancelSchedule");
const { createSchedule } = require("../database/createData");
const { updateSchedule } = require("../database/updateData");

const getReply = async (user) => {
  const services = await getData("servicos");
  const barbers = await getData("barbeiros");
  const schedule = await getSchedule(user);

  await isRegistered(user);

  let listWorkingDays = await formatedWorkingDays();
  console.log("mensagem recebida:", user.keyword);

  if (user.keyword === "0") {
    return cancelSchedule(user);
  } else if (schedule !== null && schedule.barber === null) {
    await updateSchedule(user, keyword, "barber");
    reply = `${user.name}, para realizar o agendamento com o barbeiro *${schedule.barber}* selecione umas das seguintes opções:\n\n`;
    for (let i = 0; i < services.length; i++) {
      reply = `${reply}\n*[${i + 1}]* - ${services[i].name}`;
    }
    return `${reply}\n\n *[0]* - Cancelar agendamento`;
  } else if (schedule !== null && schedule.barber !== null) {
  } else {
    createSchedule(user);
    reply = `Olá ${user.name}! Tudo certo?\nPara agendar atendimento, escolha primeiro um de nosso barbeiros!\n\n`;
    for (let i = 0; i < barbers.length; i++) {
      reply = `${reply}\n*[${i + 1}]* - ${barbers[i].name}`;
    }
    return `${reply}\n\n*[0]* - Cancelar agendamento`;
  }
};

module.exports = {
  getReply,
};
