const { calendar } = require("googleapis/build/src/apis/calendar");
const { getData } = require("../database/getData");

const hasEvent = async (user) => {
  const barbers = await getData("barbeiros");
  let hasEvent = false;
  let event;
  let chatId;
  for (let i = 0; i < barbers.length; i++) {
    let eventsArray = [];
    await fetch(
      `http://localhost:8080/events?calendarId=${barbers[i].data.calendarId}`
    )
      .then((response) => response.json())
      .then((data) => {
        for (let j = 0; j < data.length; j++) {
          console.log(data[j].description);
          eventsArray.push({
            index: j,
            id: data[j].id,
            date: data[j].start.dateTime,
            summary: data[j].summary,
            description: data[j].description,
          });
        }
      })
      .catch((error) => console.log("Erro ao buscar os eventos:", error));

    for (let k = 0; k < eventsArray.length; k++) {
      if (eventsArray[k].description.includes(user.phoneNumber)) {
        hasEvent = true;
        event = eventsArray[k];
        chatId = barbers[i].data.chatId;
        break;
      }
    }
    if (hasEvent) {
      break;
    }
  }
  return { hasEvent, event, chatId };
};

module.exports = {
  hasEvent,
};
