const { db } = require("../firebase/index");
const { updateDoc, doc } = require("firebase/firestore/lite");
const { getClient, getService, getData, getSchedule } = require("./getData");
const { getNextDays } = require("../scripts/getNextDays");
const { getEventsToday } = require("../scripts/getEventsToday");

const updateClient = () => {};
const updateBarber = () => {};
const updateGoogleSchedule = () => {};

const updateSchedule = async (user, field, eventsArr) => {
  const barbers = await getData("barbeiros");
  const services = await getData("servicos");
  const schedule = await getSchedule(user);
  const documentRef = doc(db, "agendamentos", schedule.id);
  const nextDays = getNextDays();

  // Verifique se field é igual a "barber" antes de atualizar o documento
  if (field === "barber") {
    // Verifique se user.keyword é um valor válido antes de acessar barbers
    if (user.keyword >= 1 && user.keyword <= barbers.length) {
      // Atualize o documento com o barbeiro correto
      const selectedBarber = barbers[user.keyword - 1];

      await updateDoc(documentRef, {
        barber: { id: selectedBarber.id, data: selectedBarber.data },
      })
        .then(() => {
          console.log("Documento atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar o documento:", error);
        });
    } else {
      console.error("Índice do barbeiro inválido!");
    }
  }

  if (field === "service") {
    // Verifique se user.keyword é um valor válido antes de acessar barbers
    if (user.keyword >= 1 && user.keyword <= services.length) {
      // Atualize o documento com o barbeiro correto
      const selectedService = services[user.keyword - 1];

      await updateDoc(documentRef, {
        service: { id: selectedService.id, data: selectedService.data },
      })
        .then(() => {
          console.log("Documento atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar o documento:", error);
        });
    } else {
      console.error("Índice do serviço inválido!");
    }
  }

  if (field === "dayOfWeek") {
    // Verifique se user.keyword é um valor válido antes de acessar barbers
    if (user.keyword >= 1 && user.keyword <= nextDays.length) {
      // Atualize o documento com o barbeiro correto
      const selectedDate = nextDays[user.keyword - 1];

      await updateDoc(documentRef, {
        date: { dayOfWeek: selectedDate },
      })
        .then(() => {
          console.log("dayOfWeek atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar o documento:", error);
        });
    } else {
      console.error("Dia da semana inválido!");
    }
  }

  if (field === "dayReset") {
    // Verifique se user.keyword é um valor válido antes de acessar barbers
    if (user.keyword >= 1 && user.keyword <= nextDays.length) {
      await updateDoc(documentRef, {
        date: null,
      })
        .then(() => {
          console.log("Documento atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar o documento:", error);
        });
    } else {
      console.error("Dia selecionado inválido!");
    }
  }

  if (field === "date") {
    let selectedDay = schedule.data.date.dayOfWeek.dayOfMonth.toString();
    let eventsToday = getEventsToday(eventsArr, selectedDay);
    // Verifique se user.keyword é um valor válido antes de acessar barbers
    if (user.keyword >= 1 && user.keyword <= eventsToday.length) {
      // Atualize o documento com o barbeiro correto
      const selectedDate = eventsToday[user.keyword - 1];
      console.log("selected date: ", selectedDate);
      await updateDoc(documentRef, {
        date: { id: selectedDate.id, data: selectedDate.date },
      })
        .then(() => {
          console.log("Documento atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar o documento:", error);
        });
    } else {
      console.error("O horário selecionado é inválido!");
    }
  }
};

module.exports = {
  updateClient,
  updateBarber,
  updateSchedule,
  updateGoogleSchedule,
};
