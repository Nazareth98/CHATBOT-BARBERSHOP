const getEventsToday = (eventsArr, selectedDay) => {
  let eventsToday = [];
  for (let i = 0; i < eventsArr.length; i++) {
    if (
      eventsArr[i].summary === "Livre" &&
      eventsArr[i].date.slice(8, 10) === selectedDay
    ) {
      eventsToday.push(eventsArr[i]);
    }
  }
  return eventsToday;
};

module.exports = {
  getEventsToday,
};
