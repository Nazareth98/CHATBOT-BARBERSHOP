const axios = require("axios");
const moment = require("moment");
const { formatDayOfWeek } = require("./formatDate");

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
  getNextDays
};
