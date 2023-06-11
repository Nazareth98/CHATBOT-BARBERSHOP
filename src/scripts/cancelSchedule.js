const { deleteSchedule } = require("../database/deleteData");
const { getData } = require("../database/getData");
const { db } = require("../firebase/index");
const { doc, deleteDoc } = require("firebase/firestore/lite");

const cancelSchedule = async (user) => {
  const schedules = await getData("agendamentos");

  for (item of schedules) {
    if (item.client.phoneNumber === user.phoneNumber) {
      const documentRef = doc(db, "agendamentos", item.id);
      deleteDoc(documentRef)
        .then(() => {
          console.log("Documento excluído com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir o documento:", error);
        });
    }
  }

  reply = `Agendamento cancelado com sucesso, até breve!`;
  return reply;
};

module.exports = {
  cancelSchedule,
};
