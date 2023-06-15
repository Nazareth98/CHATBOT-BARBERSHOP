const confirmSchedule = async (schedule) => {
  let eventId = schedule.data.date.id;
  let calendarId = schedule.data.barber.data.calendarId;

  await fetch(
    `http://localhost:8080/update?eventId=${eventId}&calendarId=${calendarId}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Erro ao atualizar os evento:", error);
    });
};

module.exports = {
  confirmSchedule,
};
