const { formatDayHour } = require("./formatDayHour");


const returnCancel = (event, chatId, client, user) => {
        const data = event.date;
        const name = user.name
        client.sendMessage(chatId, `*Agendamento cancelado:*\n*cliente:*${name}\n*data:*${formatDayHour(data)}\n`)
    }

const returnConfirm = (schedule, client) => {
    const data = schedule.data.date.data;
    const chatId = schedule.data.barber.data.chatId 
    const name = schedule.data.client.data.name
    const serviço = schedule.data.service.data.descripton

    client.sendMessage(chatId, `*Agendamento confirmado:*\n*cliente:*${name}*data:*${formatDayHour(data)}\n*Serviço:*${serviço}`)
}

module.exports = {
    returnCancel,
    returnConfirm
  };