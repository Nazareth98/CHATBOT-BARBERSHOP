const formatoHour = (str) => {
    console.log(str)
    const data = new Date(str); // Criar objeto de data a partir do formato ISO 8601
    const hora = data.getHours(); // Obter a hora da data
    const minuto = data.getMinutes(); // Obter o minuto da data
    
    // Formatar a hora e o minuto com dois dígitos usando o método padStart()
    const horaFormatada = hora.toString().padStart(2, '0');
    const minutoFormatado = minuto.toString().padStart(2, '0');
    
    // Concatenar a hora e o minuto formatados separados por ':' e retornar o resultado
    return `${horaFormatada}:${minutoFormatado}`;
  }
  
  
module.exports = {
    formatoHour,
};