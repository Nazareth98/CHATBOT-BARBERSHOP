const returnCancel = (schedule, client) =>{
        const chatId= schedule.data.barber.data.chatId;
        client.sendMessage(chatId, `agendamento canceldo.`)
    }



module.exports = {
    returnCancel,
  };