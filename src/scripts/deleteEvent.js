const deleteEvent = async (event) => {
  try {
    for (let i = 0; i < event.length; i++) {
      const eventId = event[i].id;
      const calendarId = event[i].calendarId;
      await fetch(
        `http://localhost:8080/delete?eventId=${eventId}&calendarId=${calendarId}`
      )
        .then((response) => response.json())
        .then((data) => console.log(">>> Evento deletado: ", data))
        .catch((error) => {
          console.error("Erro ao deletar os eventos:", error);
        });
    }
  } catch (error) {
    console.error("Erro ao deletar os eventos:", error);
  }
};

module.exports = {
  deleteEvent,
};
