const axios = require("axios");
const { formatDayOfWeek, formatMonth } = require("../scripts/formatDate");

// Função para verificar se uma data é feriado no Brasil e no Paraná
const getWorkingDays = async () => {
  const country = "BR";
  const apiUrl = `https://date.nager.at/Api/v3/NextPublicHolidays/${country}`;

  try {
    const response = await axios.get(apiUrl);
    const holidays = response.data;
    const workingDays = [];

    // Loop para verificar os próximos dias úteis
    let currentDate = new Date();
    while (workingDays.length < 5) {
      // Verifica se a data não é final de semana e não é feriado
      if (
        currentDate.getDay() !== 0 &&
        currentDate.getDay() !== 6 &&
        !isHoliday(currentDate, holidays)
      ) {
        workingDays.push(currentDate);
      }

      // Incrementa a data em um dia
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return workingDays;
  } catch (error) {
    console.error("Erro ao obter os próximos dias úteis:", error);
    return [];
  }
};

// Função para verificar se uma data é feriado
const isHoliday = (date, holidays) => {
  const formattedDate = date.toISOString().slice(0, 10);
  return holidays.some((holiday) => holiday.date === formattedDate);
};

const formatedWorkingDays = async () => {
  let nextDays = [];
  await getWorkingDays().then((workingDays) => {
    workingDays.forEach((day, index) => {
      let dayOfWeek = formatDayOfWeek(day.toDateString().slice(0, 3));
      let dayOfMonth = day.toDateString().slice(8, 10);
      let month = formatMonth(day.toDateString().slice(4, 7));

      nextDays.push(`*[${index}]* - ${dayOfWeek}, ${dayOfMonth} de ${month}.`);
    });
  });
  return nextDays;
};

module.exports = {
  formatedWorkingDays,
};
