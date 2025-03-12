import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'http://192.168.11.58:8091'
});

export default clienteAxios;