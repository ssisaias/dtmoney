import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://code.isaiasdevlog.com/proxy/3000/api'
})