const { isRegistered } = require("./isRegistered");
const { getData, getSchedule } = require("../database/getData");
const { cancelSchedule } = require("./cancelSchedule");
const { createSchedule } = require("../database/createData");
const { updateSchedule } = require("../database/updateData");
const { confirmSchedule } = require("./confirmSchedule");
const { formatHour } = require("./formatHour");
const { returnCancel } = require("./returnMessage");
const { returnConfirm } = require("./returnMessage");
const { returnContact } = require("./returnMessage");
const { getNextDays } = require("./getNextDays");
const { deleteSchedule } = require("../database/deleteData");
const { formatDayHour } = require("./formatDayHour");
const { getEvents } = require("./getEvents");
const { getEventsToday } = require("./getEventsToday");
const { hasEvent } = require("./hasEvent");
const { deleteEvent } = require("./deleteEvent");

let eventsArr = [];

const getReply = async (user, client) => {
  const services = await getData("servicos");
  const barbers = await getData("barbeiros");
  let schedule = await getSchedule(user);
  let teste = await hasEvent(user);
  console.log('AQUIIIIIII >>>>>>>>',teste)
  await isRegistered(user);

  console.log("mensagem recebida:", user.keyword);

  let reply = "";

  // Se já possuir evento agendado nos próximos dias
  if (teste.hasEvent) {
    let event = teste.event;
    console.log('AQUIIIIII22222>>>>>', event)
    let chatId = teste.chatId;
    let date = teste.event[0].date;
    switch (user.keyword) {
      case "10":
        returnCancel(event, chatId, client, user);
        deleteEvent(event);
        reply = `Ok ${user.name}, vamos lá!\nPrimeiro preciso que escolha um de nossos barbeiros!\n\n`;
        for (let i = 0; i < barbers.length; i++) {
          reply += `\n🙎‍♂️ - *[${i + 1}]* ${barbers[i].data.name}`;
        }
        reply += "\n\n*🚫 - [0]* Cancelar agendamento";
        return reply;
      case "20":
        returnCancel(event, chatId, client, user);
        deleteEvent(event);
        reply = `Pode deixar, já cancelamos!\nMas que pena 😥, assim que puder, entre em contato com a gente para refazer seu agendamento, até abreve! 👋 `;
        return reply;
      case "00":
        returnContact(event, chatId, client, user);
        reply = `Sua solicitação foi encaminhada a um de nossos atendentes, logo retornaremos o contato, até abreve! 👋`;
        return reply;
    }
    reply = `Olá *${
      user.name
    }*, vi aqui que você possui um agendamento para a data *${formatDayHour(
      date
    )}* 🤔\nMe diga qual opção melhor te atende nesse momento:\n\n🗓️ - *[10]* Preciso agendar outra data!\n🥲 - *[20]* Não poderei comparecer!\n☎️ - *[00]* Preciso falar com um atendente!`;
    return reply;
  }

  // Se a mensagem recebida for "0" cancela o agendamento
  if (user.keyword === "0") {
    await deleteSchedule(user);
    return cancelSchedule(user);
  }

  // Se ainda não existir um "agendamento", cria-se um e solicita a seleção de um "barbeiro"
  if (schedule === null) {
    createSchedule(user);

    reply = `Olá ${user.name}! Tudo certo?\nPara agendar um atendimento escolha um de nossos barbeiros!\n\n`;
    for (let i = 0; i < barbers.length; i++) {
      reply += `\n🙎‍♂️ - *[${i + 1}]* ${barbers[i].data.name}`;
  }
    reply += "\n\n*🚫 - [0]* Cancelar agendamento";
    return reply;
  }

  // Se existir "agendamento" e ele ainda não possuir "barbeiro", adiciona "barbeiro" selecionado anteriormente
  if (schedule !== null && schedule.data.barber === null) {
    await updateSchedule(user, "barber");
    schedule = await getSchedule(user);
    // Se após a atualização de "agendamento" ainda não exista um "barbeiro" selecionado, solicita a seleção novamente
    if (schedule.data.barber !== null) {
      reply = `${user.name}, para realizar o agendamento com o barbeiro ${schedule.data.barber.data.name} selecione uma das seguintes opções:\n\n`;
      for (let i = 0; i < services.length; i++) {
        reply += `\n✂️ - *[${i + 1}]* ${services[i].data.name} *[R$${services[i].data.price}]*`;
      }
      reply += "\n\n*🚫 - [0]* Cancelar agendamento";
      return reply;
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos barbeiros!\n\n`;
      for (let i = 0; i < barbers.length; i++) {
        reply += `\n🙎‍♂️ - *[${i + 1}]* ${barbers[i].data.name}`;
      }
      reply += "\n\n🚫 - *[0]* Cancelar agendamento";
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
      nextDays =  getNextDays();
      for (let i = 0; i < nextDays.length; i++) {
        reply += `\n🗓️ - *[${i + 1}]* ${nextDays[i].dayOfWeek}, dia ${
          nextDays[i].dayOfMonth
        }`;
      }
      reply += "\n\n🚫 - *[0]* Cancelar agendamento";
      return reply;
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos serviços!\n\n`;
      for (let i = 0; i < services.length; i++) {
        reply += `\n✂️ - *[${i + 1}]* ${services[i].data.name} *[R$${services[i].data.price}]*`;
      }
      reply += "\n\n*🚫 - [0]* Cancelar agendamento";
      return reply;
    }
  }

  // Se "agendamento" existe e ainda não possui "dia da semana" selecionado, adiciona "dia da semana" selecionado anteriormente
  if (schedule !== null && schedule.data.date === null) {
    await updateSchedule(user, "dayOfWeek");
    schedule = await getSchedule(user);
    eventsArr = await getEvents(schedule);

    // Se o "dia da semana" selecionado possuir horários disponíveis, exibimos opções de horários
    if (schedule.data.date !== null) {
      let selectedDay = schedule.data.date.dayOfWeek.dayOfMonth.toString();
      reply = `${user.name}, escolha um dos próximos horários disponíves:\n\n`;
      let eventsToday = getEventsToday(eventsArr, selectedDay);
      if (eventsToday.length > 0) {
        for (let i = 0; i < eventsToday.length; i++) {
          reply += `\n🕐 - *[${i + 1}]* ${formatHour(eventsToday[i].date)}`;
        }
        reply += "\n\n*🚫 - [0]* Cancelar agendamento";
        return reply;
      } else {
        await updateSchedule(user, "dayReset");
        reply = `⚠️ O dia selecionado não possui horários disponíveis, selecione um outro dia de preferência:\n\n`;
        nextDays = getNextDays();
        for (let i = 0; i < nextDays.length; i++) {
          reply += `\n🗓️ - *[${i + 1}]* ${nextDays[i].dayOfWeek}, dia ${
            nextDays[i].dayOfMonth
          }`;
        }
        reply += "\n\n*🚫 - [0]* Cancelar agendamento";
        return reply;
      }
      // Se "dia da semana" não possuir horários disponíveis, removemos a opção escolhida de "agendamentos" e solicitamos uma nova seleção
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos dias disponíveis!\n\n`;
      nextDays = getNextDays();
      for (let i = 0; i < nextDays.length; i++) {
        reply += `\n🗓️ - *[${i + 1}]* ${nextDays[i].dayOfWeek}, dia ${
          nextDays[i].dayOfMonth
        }`;
      }
      reply += "\n\n*🚫 - [0]* Cancelar agendamento";
      return reply;
    }
  }

  //Se "date" ainda não possuir "dados" sobre o dia selecionado, adiciona "dados" selecionado anteriormente
  if (schedule !== null && !schedule.data.date.hasOwnProperty("data")) {
    eventsArr = await getEvents(schedule);
    await updateSchedule(user, "date", eventsArr);
    schedule = await getSchedule(user);
    if (schedule.data.date.data !== undefined) {
      reply = `Para confirmar o agendamento de *${
        schedule.data.service.data.name
      }* com o barbeiro *${
        schedule.data.barber.data.name
      }*, \npara a data *${formatDayHour(
        schedule.data.date.data
      )}*, no valor de *R$ ${schedule.data.service.data.price}.*\nresponda com a opção *[1]*!\n\n✅ - *[1]* Confirmar agendamento\n\n🚫 - *[0]* Cancelar agendamento`;
      return reply;
    } else {
      reply = `⚠️ Opção inválida\nEscolha uma opção válida dentre nossos horários disponíveis!\n\n`;
      let selectedDay = schedule.data.date.dayOfWeek.dayOfMonth.toString();
      let eventsToday = getEventsToday(eventsArr, selectedDay);
      for (let i = 0; i < eventsToday.length; i++) {
        reply += `\n🕐 - *[${i + 1}]* ${formatHour(eventsToday[i].date)}`;
      }
      reply += "\n\n*🚫 - [0]* Cancelar agendamento";
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
      returnConfirm(schedule, client);
      deleteSchedule(user);
      confirmSchedule(schedule);
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
