const getEvents = async () => {
  await fetch("http://localhost:8080/events")
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
      console.log(eventsArr);
    })
    .catch((error) => {
      console.error("Erro ao buscar os eventos:", error);
    });
};

module.exports = {
  getEvents,
};
