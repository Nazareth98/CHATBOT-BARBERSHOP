const confirmSchedule = async (schedule) => {
  let currentEventId = schedule.data.date.id;
  for (let i = 0; i < currentEventId.length; i++) {
    let eventId = currentEventId[i];
    let calendarId = schedule.data.barber.data.calendarId;
    let description = `Cliente: ${schedule.data.client.data.name} Serviço: ${schedule.data.service.data.name} Contato: ${schedule.data.client.data.phoneNumber}`;
    await fetch(
      `http://localhost:8080/confirm?eventId=${eventId}&calendarId=${calendarId}&description=${description}`
    )
      .then((response) => response.json())
      .then((data) => console.log(">>> Evento confirmado: ", data))
      .catch((error) => {
        console.error("Erro ao atualizar o evento:", error);
      });
  }
};


module.exports = {
  confirmSchedule,
};