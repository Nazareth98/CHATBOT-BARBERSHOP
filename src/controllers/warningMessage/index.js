const { formatLongDate } = require("../../shared/formatters");

const warningMessageCancel = (event, barberChatId, client, user) => {
  let data = event.date;
  const name = user.name;
  client.sendMessage(
    barberChatId,
    `❌ - *Agendamento cancelado* \nCliente: *${name}* \nData: *${formatLongDate(
      data
    )}*\n`
  );
};

const warningMessageContact = (event, barberChatId, client, user) => {
  const name = user.name;
  let warning;
  if (event) {
    const data = event.date;
    warning = `📞 - *Solicitação de contato* \nCliente: *${name}*\nAgendamento: *${formatLongDate(
      data
    )}*`;
  } else {
    warning = `📞 - *Solicitação de contato* \nCliente: *${name}*\nSolicitação de orçamento.`;
  }
  warning += `\nhttps://wa.me/+${user.phoneNumber}`;
  client.sendMessage(barberChatId, warning);
};

const warningMessageConfirm = (schedule, client) => {
  const data = schedule.data.date.data;
  const barberChatId = schedule.data.barber.data.chatId;
  const name = schedule.data.client.data.name;
  const serviço = schedule.data.service.data.name;

  client.sendMessage(
    barberChatId,
    `✅ - *Agendamento confirmado* \nCliente: *${name}* \nData: *${formatLongDate(
      data
    )}* \nServiço: *${serviço}*`
  );
};

module.exports = {
  warningMessageCancel,
  warningMessageContact,
  warningMessageConfirm,
};
