const { deleteSchedule } = require("../database/deleteData");
const { getData } = require("../database/getData");
const { db, doc, setDoc, getDocs, deleteDoc } = require("firebase/firestore");

const cancelSchedule = async (user) => {
  const schedules = await getData("agendamentos");

  for (item of schedules) {
    let documentRef = doc(db, "agendamentos", item.id);
    if (item.client.phoneNumber === user.phoneNumber) {
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
