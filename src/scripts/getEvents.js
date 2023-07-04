const getEvents = async (schedule) => {
  const calendarId = schedule.data.barber.data.calendarId;
  const eventsArr = [];

  await fetch(`http://localhost:8080/events?calendarId=${calendarId}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        eventsArr.push({
          index: i,
          id: data[i].id,
          date: data[i].start.dateTime,
          summary: data[i].summary,
          description: data[i].description,
        });
      }
    })
    .catch((error) => console.log("Erro ao buscar os eventos:", error));

  return eventsArr;
};




module.exports = {
  getEvents,
};
