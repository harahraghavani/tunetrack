import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://shazam.p.rapidapi.com',
    headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "e2d814eba9msh00eaa75a7f4a12cp1baad9jsnc4b21e4833da",
    },
});
