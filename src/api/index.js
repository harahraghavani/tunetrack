import { axiosInstance } from './apiInstance';

export const api = async (endpoint, method = 'GET', data = null, params = null) => {
    try {
        const response = await axiosInstance({
            url: endpoint,
            method: method,
            data: data,
            params: params
        });
        return response.data;
    } catch (error) {
        console.error('API call error: ', error);
        throw error;
    }
};
