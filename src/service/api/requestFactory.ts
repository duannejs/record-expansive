import axios from 'axios';
import { stateStorage } from './apiRoutes';

export const API = axios.create({
    baseURL: process.env.urlApi
});

API.interceptors.request.use(async (config) => {
    return addAuth(config);
});


async function addAuth(config: any) {
    const token = stateStorage.getToken();
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
}