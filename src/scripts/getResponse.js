const axios = require("axios");
const { doc, setDoc, getDocs } = require("firebase/firestore");
const { db, collection, firebaseConfig } = require("../firebase/index");
const { v4: uuidv4 } = require("uuid");
const { google } = require("googleapis");
const { formatDayOfWeek, formatMonth } = require("./formatDate");

const getData = async (folder) => {
  let dataArr = [];
  const querySnapshot = await getDocs(collection(db, folder));
  querySnapshot.forEach((doc) => dataArr.push(doc.data()));

  return dataArr;
};

const createClient = async (name, phoneNumber) => {
  await setDoc(doc(db, "clientes", uuidv4()), {
    name: name,
    phoneNumber: phoneNumber,
    lastService: null,
  });
};

const createScheduleTime = async () => {};

const isRegistered = async (name, phoneNumber) => {
  const clientes = await getData("clientes");
  console.log(clientes);
  let isRegistered = false;

  for (let i; i < clientes.length; i++) {
    if (clientes[i].phoneNumber === phoneNumber) {
      isRegistered = true;
    }
  }

  if (isRegistered === false) {
    createClient(name, phoneNumber);
    return isRegistered;
  } else {
    return isRegistered;
  }
};

// Função para verificar se uma data é feriado no Brasil e no Paraná
const getWorkingDays = async () => {
  const country = "BR";
  const state = "PR";
  const apiUrl = `https://date.nager.at/Api/v3/NextPublicHolidays/${country}`;

  try {
    const response = await axios.get(apiUrl);
    const holidays = response.data;

    const workingDays = [];

    // Loop para verificar os próximos dias úteis
    let currentDate = new Date();
    while (workingDays.length < 4) {
      // Verifica se a data não é final de semana e não é feriado
      if (
        currentDate.getDay() !== 0 &&
        currentDate.getDay() !== 6 &&
        !isHoliday(currentDate, holidays)
      ) {
        workingDays.push(currentDate);
      }

      // Incrementa a data em um dia
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return workingDays;
  } catch (error) {
    console.error("Erro ao obter os próximos dias úteis:", error);
    return [];
  }
};

// Função para verificar se uma data é feriado
const isHoliday = (date, holidays) => {
  const formattedDate = date.toISOString().slice(0, 10);
  return holidays.some((holiday) => holiday.date === formattedDate);
};

// Exemplo de uso

const getResponse = async ({ keyword, chatId, name, phoneNumber }) => {
  const servicos = await getData("servicos");
  const clientes = await getData("clientes");
  const agenda = await getData("agenda");
  const registered = await isRegistered(name, phoneNumber);
  let nextDays = [];

  await getWorkingDays().then((workingDays) => {
    workingDays.forEach((day, index) => {
      let dayOfWeek = formatDayOfWeek(day.toDateString().slice(0, 3));
      let dayOfMonth = day.toDateString().slice(8, 10);
      let month = formatMonth(day.toDateString().slice(4, 7));

      nextDays.push(`*[${index}]* - ${dayOfWeek}, ${dayOfMonth} de ${month}.`);
    });
  });

  //console.log(servicos);
  //console.log(clientes);
  //console.log(agendamentos);
  // se esse cliente ja esta cadastrado

  console.log("mensagem recebida:", keyword);

  switch (keyword) {
    case "1":
      reply = `Para agendar o seu *Corte de Cabelo*, selecione um dos próximos dias disponíveis!\n\n`;
      for (let i = 0; i < nextDays.length; i++) {
        reply = `${reply}${nextDays[i]}\n`;
      }
      return reply;
    case "2":
      reply = `Para agendar o seu *Corte da sua Barba*, selecione um dos próximos dias disponíveis!\n\n`;
      for (let i = 0; i < nextDays.length; i++) {
        reply = `${reply}${nextDays[i]}\n`;
      }
      return reply;
    case "3":
      reply = `Para agendar o seu *Corte de Cabelo e Barba*, selecione um dos próximos dias disponíveis!\n\n`;
      for (let i = 0; i < nextDays.length; i++) {
        reply = `${reply}${nextDays[i]}\n`;
      }
      return reply;
    default:
      return `Olá teste ${name}! Tudo certo?\nPara agendar atendimento com Felipe selecione umas das seguintes opções:\n\n*[1]* - Cabelo\n*[2]* - Barba\n*[3]* - Cabelo e Barba`;
  }
};

module.exports = {
  getResponse,
};
