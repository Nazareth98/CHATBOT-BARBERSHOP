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
  eventsToday.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
  return eventsToday;
};

module.exports = {
  getEventsToday,
};
