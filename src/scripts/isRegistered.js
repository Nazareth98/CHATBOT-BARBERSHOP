const { getData } = require("../database/getData");
const { createClient } = require("../database/createData");

const isRegistered = async (user) => {
  const clients = await getData("clientes");
  let isRegistered = false;

  for (let i = 0; i < clients.length; i++) {
    if (clients[i].data.phoneNumber === user.phoneNumber) {
      isRegistered = true;
      break; // Se encontrou um cliente correspondente, interrompe o loop
    }
  }

  if (!isRegistered) {
    createClient(user); // Cria o cliente somente se não estiver registrado
  }

  return isRegistered;
};

module.exports = {
  isRegistered,
};
