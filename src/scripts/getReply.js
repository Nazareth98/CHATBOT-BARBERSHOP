const { getSchedule } = require("../database/getData");
const { deleteSchedule } = require("../database/deleteData");
const { validateUser, checkEventExist } = require("../businessLogic");
const { createClient } = require("../controllers/clients");
const {
  warningMessageCancel,
  warningMessageContact,
  warningMessageConfirm,
} = require("../controllers/warningMessage");
const {
  getClientEvent,
  deleteEvent,
  getAllEvents,
  confirmEvent,
} = require("../controllers/events");
const { formatLongDate } = require("../shared/formatters");
const {
  createSchedule,
  updateSchedule,
  cancelSchedule,
} = require("../controllers/shedule");
const { completeString } = require("../shared/completeString");
const { getEventsToday } = require("../shared/utils");

const getReply = async (user, client) => {
  const isValidUser = validateUser(user);
  let schedule = null;
  let reply = "";
  schedule = await getSchedule(user);
  await createClient(user);

  // Se já possuir evento agendado nos próximos dias
  let eventExist = await checkEventExist(user);
  if (eventExist == true) {
    let clientEvent = await getClientEvent(user);
    let barberChatId = clientEvent.barberChatId;
    let date = clientEvent.date;
    switch (user.keyword) {
      case "10":
        warningMessageCancel(clientEvent, barberChatId, client, user);
        deleteEvent(clientEvent);
        reply = `Ok ${user.name}, vamos lá!\nPrimeiro preciso que escolha um de nossos barbeiros!\n\n`;
        reply = await completeString(reply, "barbers");
        return reply;
      case "20":
        warningMessageCancel(clientEvent, barberChatId, client, user);
        deleteEvent(clientEvent);
        reply = `Pode deixar, já cancelamos!\nMas que pena 😥, assim que puder, entre em contato com a gente para refazer seu agendamento, até abreve! 👋 `;
        return reply;
      case "00":
        warningMessageContact(clientEvent, barberChatId, client, user);
        reply = `Sua solicitação foi encaminhada a um de nossos atendentes, logo logo retornaremos o contato!`;
        return reply;
    }
    reply = `Olá *${
      user.name
    }*, vi aqui que você possui um agendamento para a data *${formatLongDate(
      date
    )}* 🤔\nMe diga qual opção melhor te atende nesse momento:\n\n🗓️ - *[10]* Preciso agendar outra data!\n🥲 - *[20]* Não poderei comparecer!\n☎️ - *[00]* Preciso falar com um atendente!`;
    return reply;
  }

  // Se a mensagem recebida for "0" cancela o agendamento
  if (user.keyword === "0") {
    return cancelSchedule(user);
  }

  if (user.keyword === "00") {
    schedule = await getSchedule(user);
    let barberChatId = schedule.data.barber.data.chatId;
    warningMessageContact(undefined, barberChatId, client, user);
    reply = `Sua solicitação foi encaminhada ao atendente selecionado, logo logo retornaremos o contato!`;
    cancelSchedule(user);
    return reply;
  }

  // Se ainda não existir um "agendamento", cria-se um e solicita a seleção de um "barbeiro"
  if (schedule === null) {
    createSchedule(user);
    reply = `Olá ${user.name}! Tudo certo?\nPara agendar um atendimento escolha um de nossos barbeiros!\n\n`;
    reply = await completeString(reply, "barbers");
    return reply;
  }

  // Se existir "agendamento" e ele ainda não possuir "barbeiro", adiciona "barbeiro" selecionado anteriormente
  if (schedule !== null && schedule.data.barber === null) {
    await updateSchedule(user, "barber");
    schedule = await getSchedule(user);
    // Se após a atualização de "agendamento" ainda não exista um "barbeiro" selecionado, solicita a seleção novamente
    if (schedule.data.barber !== null) {
      reply = `${user.name}, para realizar o agendamento com o barbeiro ${schedule.data.barber.data.name} selecione uma das seguintes opções:\n\n`;
      reply = await completeString(reply, "services");
      return reply;
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos barbeiros!\n\n`;
      reply = await completeString(reply, "barbers");
      return reply;
    }
  }

  // Se "agendamento" existe e ainda não possui "serviço", adiciona "serviço" selecionado anteriormente
  if (schedule !== null && schedule.data.service === null) {
    await updateSchedule(user, "service");
    schedule = await getSchedule(user);
    // Se após a atualização de "agendamento" ainda não exista um "serviço" selecionado, solicita a seleção novamente
    if (schedule.data.service !== null) {
      reply = `Selecione o dia de prefrência:\n\n`;
      reply = await completeString(reply, "dayOfWeek");
      return reply;
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos serviços!\n\n`;
      reply = await completeString(reply, "services");
      return reply;
    }
  }

  // Se "agendamento" existe e ainda não possui "dia da semana" selecionado, adiciona "dia da semana" selecionado anteriormente
  if (schedule !== null && schedule.data.date === null) {
    await updateSchedule(user, "dayOfWeek");
    schedule = await getSchedule(user);
    calendarId = schedule.data.barber.data.calendarId;
    // Se o "dia da semana" selecionado possuir horários disponíveis, exibimos opções de horários
    if (schedule.data.date !== null) {
      let calendarId = schedule.data.barber.data.calendarId;
      let eventsArr = await getAllEvents(calendarId);
      let selectedDay = schedule.data.date.dayOfWeek.dayOfMonth.toString();
      let eventsToday = getEventsToday(eventsArr, selectedDay);
      if (eventsToday.length > 0) {
        reply = `${user.name}, escolha um dos próximos horários disponíves:\n\n`;
        reply = await completeString(reply, "hours", eventsToday);
        return reply;
      } else {
        await updateSchedule(user, "dayReset");
        reply = `⚠️ O dia selecionado não possui horários disponíveis, selecione um outro dia de preferência:\n\n`;
        reply = await completeString(reply, "dayOfWeek");
        return reply;
      }
      // Se "dia da semana" não possuir horários disponíveis, removemos a opção escolhida de "agendamentos" e solicitamos uma nova seleção
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos dias disponíveis!\n\n`;
      reply = await completeString(reply, "dayOfWeek");
      return reply;
    }
  }

  //Se "date" ainda não possuir "dados" sobre o dia selecionado, adiciona "dados" selecionado anteriormente
  if (schedule !== null && !schedule.data.date.hasOwnProperty("data")) {
    schedule = await getSchedule(user);
    calendarId = schedule.data.barber.data.calendarId;
    let eventsArr = await getAllEvents(calendarId);
    await updateSchedule(user, "date", eventsArr);
    schedule = await getSchedule(user);
    if (schedule.data.date.data !== undefined) {
      reply = `Para confirmar o agendamento de *${
        schedule.data.service.data.name
      }* com o barbeiro *${
        schedule.data.barber.data.name
      }*, \npara a data *${formatLongDate(
        schedule.data.date.data
      )}*, no valor de *R$ ${
        schedule.data.service.data.price
      }.*\nresponda com a opção *[1]*!\n\n✅ - *[1]* Confirmar agendamento\n\n🚫 - *[0]* Cancelar agendamento`;
      return reply;
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos horários disponíveis!\n\n`;
      let selectedDay = schedule.data.date.dayOfWeek.dayOfMonth.toString();
      let eventsToday = getEventsToday(eventsArr, selectedDay);
      reply = await completeString(reply, "hours", eventsToday);
      return reply;
    }
  }

  //Se todos os campos acima foram preenchidos corretamente, verificar se há confirmação do agendamento e finaliza atendimento
  if (
    schedule !== null &&
    schedule.data.date !== null &&
    schedule.data.service !== null &&
    schedule.data.barber !== null
  ) {
    schedule = await getSchedule(user);

    if (user.keyword === "1") {
      warningMessageConfirm(schedule, client);
      deleteSchedule(user);
      confirmEvent(schedule);
      reply = `Tudo certo, só comparecer na data escolhida!`;
      return reply;
    } else {
      reply = `Por favor, selecione uma opção válida`;
      return reply;
    }
  }

  return false;
};

module.exports = {
  getReply,
};
