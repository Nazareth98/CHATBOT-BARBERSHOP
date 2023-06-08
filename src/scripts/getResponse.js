const getResponse = async ({ name, phoneNumber }) => {
  return `mensagem recebida de ${name}`;
};

module.exports = {
  getResponse,
};
