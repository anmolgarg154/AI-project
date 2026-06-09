import axios from "axios";

const BASE_URL = "http://localhost:5000/api/chat";

// send message
export const sendMessage = async (message) => {
  const res = await axios.post(`${BASE_URL}`, {
    question: message,
  });

  return res.data.data;
};

// get history
export const getHistory = async () => {
  const res = await axios.get(`${BASE_URL}/history`);
  return res.data.data;
};