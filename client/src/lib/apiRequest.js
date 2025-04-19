import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://estate-deployed-s448.onrender.com",
  withCredentials: true,
});

export default apiRequest;