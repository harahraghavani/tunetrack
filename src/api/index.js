import toast from "react-hot-toast";
import { axiosInstance } from "./apiInstance";

export const api = async ({ endpoint, method, data = null, params = null }) => {
    try {
        const response = await axiosInstance({
            url: endpoint,
            method: method,
            data: data,
            params: params,
        });
        return response.data;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
};
