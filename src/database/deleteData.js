const { db, doc, setDoc, deleteDoc } = require("../firebase/index");
const { getSchedule } = require("./getData");

const deleteSchedule = async (user) => {
  const schedule = await getSchedule(user);
  const documentRef = doc(db, "agendamentos", schedule.id);
  if (schedule !== null) {
    console.log(">>> Agendamento temporário excluído");
    await deleteDoc(documentRef);
  }
};

module.exports = {
  deleteSchedule,
};
