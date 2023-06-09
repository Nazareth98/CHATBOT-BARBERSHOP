const formatDayOfWeek = (day) => {
  switch (day) {
    case "Sun":
      return "Domingo";
    case "Mon":
      return "Segunda-feira";
    case "Tue":
      return "Terça-feira";
    case "Wed":
      return "Quarta-feira";
    case "Thu":
      return "Quinta-feira";
    case "Fri":
      return "Sexta-feira";
    case "Sat":
      return "Sábado";
    default:
      return "";
  }
};

const formatMonth = (month) => {
  switch (month) {
    case "Jan":
      return "Janeiro";
    case "Feb":
      return "Fevereiro";
    case "Mar":
      return "Março";
    case "Apr":
      return "Abril";
    case "May":
      return "Maio";
    case "Jun":
      return "Junho";
    case "Jul":
      return "Julho";
    case "Aug":
      return "Agosto";
    case "Sep":
      return "Setembro";
    case "Oct":
      return "Outubro";
    case "Nov":
      return "Novembro";
    case "Dec":
      return "Dezembro";
    default:
      return "";
  }
};

module.exports = {
  formatMonth,
  formatDayOfWeek,
};
