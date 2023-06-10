const { db, collection, getDocs } = require("../firebase/index");

const getData = async (folder) => {
  let dataArr = [];
  const querySnapshot = await getDocs(collection(db, folder));
  querySnapshot.forEach((doc) => dataArr.push(doc.data()));

  return dataArr;
};

const getSchedule = async (user) => {
  const schedules = await getData("agendamentos");
  const clientSchedule = null;

  for (item of schedules) {
    if (item.client.phoneNumber === user.phoneNumber) {
      clientSchedule = item;
    }
  }
  return clientSchedule;
};

const getClient = async (user) => {
  const clients = await getData("clientes");
  const client = null;

  for (item of clients) {
    if (item.phoneNumber === user.phoneNumber) {
      client = item;
    }
  }
  return client;
};

const getService = async (keyword) => {
  const services = await getData("servicos");
  const service = null;

  for (item of services) {
    if (item.index === keyword - 1) {
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
