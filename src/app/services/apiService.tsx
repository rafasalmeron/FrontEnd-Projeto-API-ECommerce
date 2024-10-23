import axiosInstance from './axiosInstance';

export const makeRequest = async (url: string, method: 'get' | 'post' | 'put' | 'delete', data?: any) => {
    try {
        const response = await axiosInstance({
            url,
            method,
            data,
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao fazer requisição ${method.toUpperCase()} para ${url}:`, error);
        throw error;
    }
};
