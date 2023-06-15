const formatDayOfWeek = (day) => {
  switch (day) {
    case "0":
      return "Domingo";
    case "1":
      return "Segunda-feira";
    case "2":
      return "Terça-feira";
    case "3":
      return "Quarta-feira";
    case "4":
      return "Quinta-feira";
    case "5":
      return "Sexta-feira";
    case "6":
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
