import axios from "axios";

const intance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true // envia las cookies al servidor
});

export default intance;