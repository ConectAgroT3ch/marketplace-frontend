import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333", // depois vamos mudar para AWS
});

export default api;
