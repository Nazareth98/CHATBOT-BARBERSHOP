const { v4: uuidv4 } = require("uuid");
const { db, doc, setDoc } = require("../firebase/index");
const { getClient, getService } = require("./getData");

const createClient = async ({ name, phoneNumber, chatId }) => {
  if (phoneNumber.includes("status")) {
    return null;
  } else {
    if (chatId.includes("g.us")) {
      return null;
    } else {
      await setDoc(doc(db, "clientes", uuidv4()), {
        name: name,
        phoneNumber: phoneNumber,
        totalServices: 0,
        lastService: null,
      });
    }
  }
};

const createSchedule = async (user, schedule) => {
  if (schedule !== null) {
    return null;
  } else {
    if (user.phoneNumber.includes("status")) {
      return null;
    } else {
      const client = await getClient(user);
      await setDoc(doc(db, "agendamentos", uuidv4()), {
        client: client,
        service: null,
        barber: null,
        date: null,
      });
    }
  }
};

const createGoogleSchedule = (user) => {};

module.exports = {
  createClient,
  createSchedule,
};

// FINALIZAR FUNÇÃO createSchedule(USER, KEYWORD)
