import axios from './axios';

//  se crea la constante se le pasa un usuario y se hace una peticion post a la ruta de la api
export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`)
