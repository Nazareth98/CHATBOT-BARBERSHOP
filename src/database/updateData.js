const { updateDoc } = require("firebase/firestore/lite");

const updateScheduleProp = async (documentRef, prop, value) => {
  const updateContent = {
    [prop]: value,
  };
  await updateDoc(documentRef, updateContent);
};

module.exports = {
  updateScheduleProp,
};
