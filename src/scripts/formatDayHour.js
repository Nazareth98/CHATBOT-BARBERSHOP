const formatDayHour = (str) => {
    const data = new Date(str);
    const opcoes = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
    const dataFormatada = data.toLocaleString('pt-BR', opcoes);
  
    return dataFormatada;
  }
  

  module.exports = {
    formatDayHour,
  };
  