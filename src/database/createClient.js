const { v4: uuidv4 } = require("uuid");
const { doc, setDoc, getDocs } = require("firebase/firestore");
const { db, collection, firebaseConfig } = require("../firebase/index");

const createClient = async ({ name, phoneNumber }) => {
  await setDoc(doc(db, "clientes", uuidv4()), {
    name: name,
    phoneNumber: phoneNumber,
    totalServices: 0,
    lastService: null,
  });
};

module.exports = {
  createClient,
};
