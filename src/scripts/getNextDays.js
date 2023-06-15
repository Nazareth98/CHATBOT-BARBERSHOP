const moment = require("moment");
const { formatDayOfWeek } = require("./formatDate");

const getNextDays = () => {
  let nextDays = [];
  for (let i = 0; i < 7; i++) {
    let Day = new Date();
    let data = moment(Day);
    let j = i;
    let formatedDate = data.format("YYYY-MM-DDTHH:mm:ssZ");

    if (Day.getDay() + i > 6) {
      j = i - 7;
    }

    let dayOfMonth = Day.getDate() + i;
    let dayOfWeek = Day.getDay() + j;
    if (dayOfWeek !== 0) {
      nextDays.push({
        Date: formatedDate,
        dayOfWeek: formatDayOfWeek(dayOfWeek.toString()),
        dayOfMonth: dayOfMonth,
      });
    }
  }

  return nextDays;
};

module.exports = {
  getNextDays,
};
