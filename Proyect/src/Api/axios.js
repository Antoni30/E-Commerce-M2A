import axios from "axios";
const API = "http://localhost:80/Cassandra/api";
const instance=axios.create({
  baseURL: API,
  withCredentials: true,
});

export default instance;