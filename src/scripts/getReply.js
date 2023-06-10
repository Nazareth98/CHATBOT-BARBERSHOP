const axios = require("axios");
const { doc, setDoc, getDocs } = require("firebase/firestore");
const { db, collection, firebaseConfig } = require("../firebase/index");
const { v4: uuidv4 } = require("uuid");
const { google } = require("googleapis");
const { formatDayOfWeek, formatMonth } = require("./formatDate");
const { getData } = require("../database/getData");
const { isRegistered } = require("./isRegistered");
const { formatedWorkingDays } = require("../services/getWorkingDays");

// Exemplo de uso

const getReply = async (user) => {
  await isRegistered(user);
  let listWorkingDays = await formatedWorkingDays();
  console.log(listWorkingDays);
  console.log("mensagem recebida:", user.keyword);

  switch (user.keyword) {
    case "1":
      reply = `Para agendar o seu *Corte de Cabelo*, selecione um dos próximos dias disponíveis!\n\n`;
      for (let i = 0; i < listWorkingDays.length; i++) {
        reply = `${reply}${listWorkingDays[i]}\n`;
      }
      return reply;
    case "2":
      reply = `Para agendar o seu *Corte da sua Barba*, selecione um dos próximos dias disponíveis!\n\n`;
      for (let i = 0; i < listWorkingDays.length; i++) {
        reply = `${reply}${listWorkingDays[i]}\n`;
      }
      return reply;
    case "3":
      reply = `Para agendar o seu *Corte de Cabelo e Barba*, selecione um dos próximos dias disponíveis!\n\n`;
      for (let i = 0; i < listWorkingDays.length; i++) {
        reply = `${reply}${listWorkingDays[i]}\n`;
      }
      return reply;
    default:
      return `Olá teste ${user.name}! Tudo certo?\nPara agendar atendimento com Felipe selecione umas das seguintes opções:\n\n*[1]* - Cabelo\n*[2]* - Barba\n*[3]* - Cabelo e Barba`;
  }
};

module.exports = {
  getReply,
};
