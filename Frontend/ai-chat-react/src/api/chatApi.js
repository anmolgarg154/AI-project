import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Send message (FIXED)
export const sendMessage = async (message) => {
  const res = await axios.post(`${BASE_URL}/chat`, {
    question: message,   // 🔥 MUST MATCH BACKEND
  });

  return res.data.data; // backend returns { success, data }
};

// Get history (FIXED ROUTE NAME)
export const getHistory = async () => {
  const res = await axios.get(`${BASE_URL}/conversations`);

  return res.data.data; // backend returns { success, data }
};