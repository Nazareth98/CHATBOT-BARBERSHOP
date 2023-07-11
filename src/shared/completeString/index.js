const { getData } = require("../../database/getData");
const { formatHours } = require("../formatters");
const { getNextDays } = require("../utils");

const completeString = async (parcialReply, category, eventsToday) => {
  const barbers = await getData("barbeiros");
  const services = await getData("servicos");

  let completeReply = parcialReply;

  if (category === "barbers") {
    for (let i = 0; i < barbers.length; i++) {
      completeReply += `\n🙎‍♂️ - *[${i + 1}]* ${barbers[i].data.name}`;
    }
  }

  if (category === "services") {
    for (let i = 0; i < services.length; i++) {
      completeReply += `\n✂️ - *[${i + 1}]* ${services[i].data.name} *[R$${
        services[i].data.price
      }]*`;
    }
    completeReply += `\n🧾 - *[00]*  Serviços por Orçamento\n_*Ex:* Platinado, Luzes, Shaver..._`;
  }

  if (category === "dayOfWeek") {
    let nextDays = getNextDays();
    for (let i = 0; i < nextDays.length; i++) {
      completeReply += `\n🗓️ - *[${i + 1}]* ${nextDays[i].dayOfWeek}, dia ${
        nextDays[i].dayOfMonth
      }`;
    }
  }

  if (category === "hours") {
    for (let i = 0; i < eventsToday.length; i++) {
      completeReply += `\n🕐 - *[${i + 1}]* ${formatHours(
        eventsToday[i].date
      )}`;
    }
  }

  completeReply +=
    "\n\n*🚫 - [0]* Cancelar agendamento e voltar ao menu inicial";
  return completeReply;
};

module.exports = {
  completeString,
};
