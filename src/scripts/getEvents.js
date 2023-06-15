const getEvents = async (schedule) => {
  const calendarId = schedule.data.barber.data.calendarId;
  console.log(calendarId);
  const eventsArr = [];

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/events?calendarId=${calendarId}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          eventsArr.push({
            index: i,
            id: data[i].id,
            date: data[i].start.dateTime,
            summary: data[i].summary,
          });
        }
        resolve(eventsArr);
      })
      .catch((error) => {
        console.error("Erro ao buscar os eventos:", error);
        reject(error);
      });
  });
};

module.exports = {
  getEvents,
};
