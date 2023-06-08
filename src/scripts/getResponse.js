const { doc, setDoc, getDocs } = require("firebase/firestore");
const { db, collection } = require("../firebase/index");
const { v4: uuidv4 } = require("uuid");

const getData = async (folder) => {
  let dataArr = [];
  const querySnapshot = await getDocs(collection(db, folder));
  querySnapshot.forEach((doc) => dataArr.push(doc.data()));

  return dataArr;
};

const isRegistered = async (phoneNumber) => {
  const clientes = await getData("clientes");
  let isRegistered = false;

  for (let i; i <= clientes.length; i++) {
    if (clientes[i].phoneNumber === phoneNumber) {
      isRegistered = true;
    }
  }
  return isRegistered;
};

const createClient = async (name, phoneNumber) => {
  await setDoc(doc(db, "clientes", uuidv4()), {
    name: name,
    phoneNumber: phoneNumber,
    lastService: null,
  });
};

const getResponse = async ({ keyword, chatId, name, phoneNumber }) => {
  const servicos = await getData("servicos");
  const clientes = await getData("clientes");
  const agendamentos = await getData("agendamentos");

  //console.log(servicos);
  //console.log(clientes);
  //console.log(agendamentos);

  // se esse cliente ja esta cadastrado
  if (isRegistered(phoneNumber) === true) {
    return `Olá ${name}! Tudo certo?\nPara agendar atendimento com Felipe selecione umas das seguintes opções:\n\nhjasdajs`;
  } else {
    createClient(name, phoneNumber);
    console.log("nao tem cadastro");
    return `Olá ${name}! Tudo certo?\nPara agendar atendimento com Felipe selecione umas das seguintes opções:\n\nhjasdajs`;
  }
};

module.exports = {
  getResponse,
};
