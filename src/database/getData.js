const { db } = require("../firebase/index");
const { getDocs, collection } = require("firebase/firestore/lite");

const getData = async (folder) => {
  let dataArr = [];
  const querySnapshot = await getDocs(collection(db, folder));
  querySnapshot.forEach((doc) =>
    dataArr.push({ id: doc.id, data: doc.data() })
  );

  return dataArr;
};

const getSchedule = async (user) => {
  const schedules = await getData("agendamentos");
  let clientSchedule = null;
  if (schedules.length > 0) {
    for (let i = 0; i < schedules.length; i++) {
      if (
        schedules[i].data.client !== null &&
        schedules[i].data.client !== undefined &&
        schedules[i].data.client.data.phoneNumber === user.phoneNumber
      ) {
        clientSchedule = schedules[i];
        break;
      }
    }
  }
  return clientSchedule;
};

const getClient = async (user) => {
  const clients = await getData("clientes");
  let client = null;

  for (item of clients) {
    if (item.data.phoneNumber === user.phoneNumber) {
      client = item;
    }
  }
  return client;
};

const getService = async (keyword) => {
  const services = await getData("servicos");
  let service = null;

  for (item of services) {
    if (item.data.index === keyword - 1) {
      service = item;
    }
  }
  return service;
};

module.exports = {
  getData,
  getSchedule,
  getClient,
  getService,
};
