const { v4: uuidv4 } = require("uuid");
const { db, doc, setDoc } = require("../firebase/index");
const { getClient, getService } = require("./getData");

const createClient = async ({ name, phoneNumber }) => {
  if (!phoneNumber.includes("status")) {
    await setDoc(doc(db, "clientes", uuidv4()), {
      name: name,
      phoneNumber: phoneNumber,
      totalServices: 0,
      lastService: null,
    });
  }
};

const createSchedule = async (user) => {
  const client = await getClient(user);
  await setDoc(doc(db, "clientes", uuidv4()), {
    client: client,
    service: null,
    barber: null,
    lastService: null,
  });
};

const createGoogleSchedule = (user) => {};

module.exports = {
  createClient,
  createSchedule,
};

// FINALIZAR FUNÇÃO createSchedule(USER, KEYWORD)
