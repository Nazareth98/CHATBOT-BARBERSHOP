const formatLongDate = (date) => {
  const data = new Date(date);
  const diaSemana = { weekday: "long" };
  const mes = data.getMonth() + 1;
  const dia = data.getDate(); // Criar objeto de data a partir do formato ISO 8601
  const hora = data.getHours(); // Obter a hora da data
  const minuto = data.getMinutes(); // Obter o minuto da data

  // Formatar a hora e o minuto com dois dígitos usando o método padStart()
  const diaSemanaFormatada = data.toLocaleString("pt-BR", diaSemana);
  const mesFormatada = mes.toString().padStart(2, "0");
  const diaFormatada = dia.toString().padStart(2, "0");
  const horaFormatada = hora.toString().padStart(2, "0");
  const minutoFormatado = minuto.toString().padStart(2, "0");

  // Concatenar a hora e o minuto formatados separados por ':' e retornar o resultado
  return `${diaFormatada}/${mesFormatada} ${diaSemanaFormatada}, as ${horaFormatada}:${minutoFormatado}`;
};

const formatHours = (str) => {
  const data = new Date(str); // Criar objeto de data a partir do formato ISO 8601
  const hora = data.getHours(); // Obter a hora da data
  const minuto = data.getMinutes(); // Obter o minuto da data

  // Formatar a hora e o minuto com dois dígitos usando o método padStart()
  const horaFormatada = hora.toString().padStart(2, "0");
  const minutoFormatado = minuto.toString().padStart(2, "0");

  // Concatenar a hora e o minuto formatados separados por ':' e retornar o resultado
  return `${horaFormatada}:${minutoFormatado}`;
};

const formatToNumber = (chatId) => {
  number = chatId.slice(0, -5);
  return number;
};

const formatToChatId = (phoneNumber) => {
  chatId = "55" + phoneNumber + "@c.us";
  return chatId;
};

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
  formatLongDate,
  formatHours,
  formatToChatId,
  formatToNumber,
  formatDayOfWeek,
  formatMonth,
};
