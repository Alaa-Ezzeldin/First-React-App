import axios from 'axios';

export const httpClient = axios.create({});

httpClient.defaults.baseURL="https://jsonplaceholder.typicode.com"

httpClient.interceptors.request.use(function (config) {
    config.headers = { ...config.headers };

    return config;
}, function (error) {
    return Promise.reject(error);
});

httpClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    return Promise.reject(error);
});