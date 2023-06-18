const { deleteSchedule } = require("../database/deleteData");
const { getData, getSchedule } = require("../database/getData");
const { db } = require("../firebase/index");
const { doc, deleteDoc } = require("firebase/firestore/lite");

const cancelSchedule = async (user) => {
  const schedule = await getSchedule(user);

  if (schedule !== null) {
    const documentRef = doc(db, "agendamentos", schedule.id);
    deleteDoc(documentRef)
      .then(() => {
        console.log("Documento excluído com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao excluir o documento:", error);
      });
  }

  reply = `Agendamento cancelado com sucesso, até breve!`;
  return reply;
};

module.exports = {
  cancelSchedule,
};
