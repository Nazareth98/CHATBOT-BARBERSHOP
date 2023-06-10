const { getData } = require("../database/getData");
const { createClient } = require("../database/createClient");

const isRegistered = async (user) => {
  const clients = await getData("clientes");
  console.log(clients);
  let isRegistered = false;

  for (let i; i < clientes.length; i++) {
    if (clients[i].phoneNumber === user.phoneNumber) {
      isRegistered = true;
    }
  }

  if (isRegistered === false) {
    createClient(user);
    return isRegistered;
  } else {
    return isRegistered;
  }
};

module.exports = {
  isRegistered,
};