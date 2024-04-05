import axios from 'axios';

const API = 'http://localhost:3000/api';
//  se crea la constante se le pasa un usuario y se hace una peticion post a la ruta de la api
export const registerRequest = user => axios.post(`${API}/register`, user);