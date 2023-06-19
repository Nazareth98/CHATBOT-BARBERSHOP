const formatDayHour1 = (str) => {
  const data = new Date(str);
  const opcoes = { month: "numeric", day: "numeric", weekday: "long", hour: "numeric", minute: "numeric" };
  const dataFormatada = data.toLocaleString("pt-BR", opcoes);

  return dataFormatada;
};
const formatDayHour = (str) => {
  const data = new Date(str);
  const diaSemana = {weekday: "long"}
  const mes = data.getMonth();
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
module.exports = {
  formatDayHour,
};
