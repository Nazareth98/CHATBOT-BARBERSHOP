const { db, collection, firebaseConfig } = require("../firebase/index");

const getData = async (folder) => {
  let dataArr = [];
  const querySnapshot = await getDocs(collection(db, folder));
  querySnapshot.forEach((doc) => dataArr.push(doc.data()));

  return dataArr;
};

module.exports = {
  getData,
};
