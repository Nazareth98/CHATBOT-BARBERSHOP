const confirmSchedule = async (schedule) => {
  eventId = schedule.data.date.id;
  await fetch(`http://localhost:8080/update?eventId=${eventId}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Erro ao atualizar os evento:", error);
    });
};

module.exports = {
  confirmSchedule,
};
