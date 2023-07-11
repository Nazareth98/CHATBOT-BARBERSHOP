const { formatDayOfWeek } = require("../formatters");

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

const getNextDays = () => {
  let nextDays = [];
  let currentDate = new Date();

  for (let i = 0; i < 7; i++) {
    let nextDay = new Date();
    nextDay.setDate(currentDate.getDate() + i);

    let dayOfMonth = nextDay.getDate().toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
    let dayOfWeek = nextDay.getDay();

    if (dayOfWeek !== 0) {
      let formatedDate = nextDay.toISOString();
      let formattedDayOfWeek = formatDayOfWeek(dayOfWeek.toString());

      nextDays.push({
        Date: formatedDate,
        dayOfWeek: formattedDayOfWeek,
        dayOfMonth: dayOfMonth,
      });
    }
  }

  return nextDays;
};

module.exports = {
  getEventsToday,
  getNextDays,
};
