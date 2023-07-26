const { doc, deleteDoc } = require("firebase/firestore/lite");
const { addSchedule } = require("../../database/createData");
const { updateScheduleProp } = require("../../database/updateData");
const { getData, getSchedule } = require("../../database/getData");
const { db } = require("../../config/firebase");
const { getNextDays, getEventsToday } = require("../../shared/utils");
const { checkScheduleExist } = require("../../businessLogic");

const createSchedule = async (user) => {
  const eventExist = await checkScheduleExist(user);
  console.log("eventExist", eventExist);
  if (eventExist === false) {
    await addSchedule(user);
  }
};

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

const updateSchedule = async (user, field, eventsArr) => {
  const barbers = await getData("barbeiros");
  const services = await getData("servicos");
  const schedule = await getSchedule(user);
  const documentRef = doc(db, "agendamentos", schedule.id);
  const nextDays = getNextDays();

  if (field === "barber") {
    if (user.keyword >= 1 && user.keyword <= barbers.length) {
      try {
        const selectedBarber = barbers[user.keyword - 1];
        const prop = "barber";
        const value = { id: selectedBarber.id, data: selectedBarber.data };
        await updateScheduleProp(documentRef, prop, value);
        console.log("Documento atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o documento:", error);
      }
    } else {
      console.error("Índice do barbeiro inválido!");
    }
  }

  if (field === "service") {
    if (user.keyword >= 1 && user.keyword <= services.length) {
      try {
        const selectedService = services[user.keyword - 1];
        const prop = "service";
        const value = { id: selectedService.id, data: selectedService.data };
        await updateScheduleProp(documentRef, prop, value);
        console.log("Documento atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o documento:", error);
      }
    } else {
      console.error("Índice do serviço inválido!");
    }
  }

  if (field === "dayOfWeek") {
    // Verifique se user.keyword é um valor válido antes de acessar barbers
    if (user.keyword >= 1 && user.keyword <= nextDays.length) {
      try {
        const selectedDate = nextDays[user.keyword - 1];
        const prop = "date";
        const value = { dayOfWeek: selectedDate };
        await updateScheduleProp(documentRef, prop, value);
        console.log("Dia da Semana atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o documento:", error);
      }
    } else {
      console.error("Dia da semana inválido!");
    }
  }

  if (field === "dayReset") {
    if (user.keyword >= 1 && user.keyword <= nextDays.length) {
      try {
        const prop = "date";
        const value = null;
        await updateScheduleProp(documentRef, prop, value);
        console.log("Documento atualizado com sucesso!.");
      } catch (error) {
        console.error("Erro ao atualizar o documento:", error);
      }
    } else {
      console.error("Dia selecionado inválido!");
    }
  }

  if (field === "date") {
    let selectedDay = schedule.data.date.dayOfWeek.dayOfMonth.toString();
    let eventsToday = getEventsToday(eventsArr, selectedDay);

    if (user.keyword >= 1 && user.keyword <= eventsToday.length) {
      let selectedDate = [];
      if (schedule.data.service.data.timeToDo === "1") {
        selectedDate = [eventsToday[user.keyword - 1]];
      } else {
        selectedDate = [
          eventsToday[user.keyword - 1],
          eventsToday[user.keyword],
        ];
      }
      const selectedDateIds = selectedDate.map((data) => data.id); // Extrai apenas os ids das datas selecionadas
      const selectedDateData = selectedDate[0].date;

      try {
        const prop = "date";
        const value = { id: selectedDateIds, data: selectedDateData };
        await updateScheduleProp(documentRef, prop, value);
        console.log("Documento atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o documento:", error);
      }
    } else {
      console.error("O horário selecionado é inválido!");
    }
  }
};

module.exports = {
  cancelSchedule,
  createSchedule,
  updateSchedule,
};
