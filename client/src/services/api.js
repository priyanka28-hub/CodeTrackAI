import axios from "axios";

const API = axios.create({
  baseURL: "https://codetrackai-production.up.railway.app/api"
});

export default API;