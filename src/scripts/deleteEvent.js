const deleteEvent = async (event) => {
    let eventId = event.id;
    let calendarId = event.calendarId;
    await fetch(
      `http://localhost:8080/delete?eventId=${eventId}&calendarId=${calendarId}`
    )
      .then((response) => response.json())
      .then((data) => console.log(">>> Evento deletado: ", data))
      .catch((error) => {
        console.error("Erro ao deletar os evento:", error);
      });
  };
  
  module.exports = {
    deleteEvent,
  };
  