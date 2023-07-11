const { v4: uuidv4 } = require("uuid");
const { db, doc, setDoc } = require("../config/firebase/index");
const { getClient } = require("./getData");

const addClient = async ({ name, phoneNumber }) => {
  try {
    await setDoc(doc(db, "clientes", uuidv4()), {
      name: name,
      phoneNumber: phoneNumber,
      totalServices: 0,
      lastService: null,
    });
    console.log("Cliente criado com sucesso");
  } catch (error) {
    console.log("Erro ao criar Cliente: " + error);
  }
};

const addSchedule = async (user) => {
  const client = await getClient(user);
  if (client !== null) {
    try {
      await setDoc(doc(db, "agendamentos", uuidv4()), {
        client: client,
        service: null,
        barber: null,
        date: null,
      });
      console.log("Agendamento criado com sucesso");
    } catch (error) {
      console.log("Erro ao criar agendamento: " + error);
    }
  }
};

module.exports = {
  addClient,
  addSchedule,
};

// FINALIZAR FUNÇÃO createSchedule(USER, KEYWORD)
