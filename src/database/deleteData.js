const { db, doc, setDoc, deleteDoc } = require("../config/firebase/index");
const { getSchedule } = require("./getData");

const deleteSchedule = async (user) => {
  const schedule = await getSchedule(user);
  if (schedule !== null) {
    const documentRef = doc(db, "agendamentos", schedule.id);
    console.log(">>> Agendamento temporário excluído");
    await deleteDoc(documentRef);
  }
};

module.exports = {
  deleteSchedule,
};
