import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitForm = async (payload) => {
  const { data } = await api.post("/submissions", payload);
  return data;
};

export const fetchSubmissions = async (type) => {
  const { data } = await api.get("/submissions", { params: type ? { type } : {} });
  return data;
};

export const fetchSubmissionStats = async () => {
  const { data } = await api.get("/submissions/stats");
  return data;
};
