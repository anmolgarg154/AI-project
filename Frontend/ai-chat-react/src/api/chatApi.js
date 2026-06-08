import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// send message
export const sendMessage = async (message) => {
  const res = await axios.post(`${BASE_URL}/chat`, {
    question: message,
  });

  return res.data.data;
};

// get history
export const getHistory = async () => {
  const res = await axios.get(`${BASE_URL}/conversations`);
  return res.data.data;
};