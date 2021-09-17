import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ideiasdefuturo.herokuapp.com',
});

export default api;