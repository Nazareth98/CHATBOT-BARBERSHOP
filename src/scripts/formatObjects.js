export const formatToNumber = (chatId) => {
  number = chatId.slice(0, -5);
  return number;
};

export const formatToChatId = (phoneNumber) => {
  chatId = "55" + phoneNumber + "@c.us";
  return chatId;
};
