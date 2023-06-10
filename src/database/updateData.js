const { db, firebaseConfig, updateDoc, doc } = require("../firebase/index");
const { getClient, getService, getSchedule } = require("./getData");

const updateClient = () => {};
const updateBarber = () => {};
const updateGoogleSchedule = () => {};

const updateSchedule = async (user, keyword, field) => {
  const barbers = await getData("barbeiros");
  const schedule = await getSchedule(user);
  const documentRef = doc(db, "agendamentos", schedule.id);

  // Atualize o documento com os novos dados
  updateDoc(documentRef, {
    client: schedule.client,
    service: schedule.service,
    barber: barbers[keyword - 1],
    lastService: schedule.lastService,
  })
    .then(() => {
      console.log("Documento atualizado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao atualizar o documento:", error);
    });
};

module.exports = {
  updateClient,
  updateBarber,
  updateSchedule,
  updateGoogleSchedule,
};
