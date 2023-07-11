const { validateClient } = require("../../businessLogic");
const { addClient } = require("../../database/createData");

const createClient = async (user) => {
  let clientExist = await validateClient(user);
  console.log("clientExist", clientExist);
  if (clientExist === false) {
    addClient(user);
  }
};

module.exports = {
  createClient,
};
