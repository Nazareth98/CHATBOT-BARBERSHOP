const { formatDayHour } = require("./formatDayHour");


const returnCancel = (event, chatId, client, user) => {
        let data = event[0].date;
        const name = user.name
        client.sendMessage(chatId, `❌ - *Agendamento cancelado* \nCliente: *${name}* \nData: *${formatDayHour(data)}*\n`)
};


const returnContact = (event, chatId, client, user) => {
    const data = event.date;
    const name = user.name
    client.sendMessage(chatId, `📞 - *Solicitação de contato* \nCliente: *${name}* \nAgendamento: *${formatDayHour(data)}*`)
};


const returnConfirm = (schedule, client) => {
    const data = schedule.data.date.data;
    const chatId = schedule.data.barber.data.chatId 
    const name = schedule.data.client.data.name
    const serviço = schedule.data.service.data.name

    client.sendMessage(chatId, `✅ - *Agendamento confirmado* \nCliente: *${name}* \nData: *${formatDayHour(data)}* \nServiço: *${serviço}*`)
};




module.exports = {
    returnCancel,
    returnConfirm,
    returnContact
  };