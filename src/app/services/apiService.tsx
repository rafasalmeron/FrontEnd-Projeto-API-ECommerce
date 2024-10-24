import axiosInstance from './axiosInstance';
import { AxiosResponse, AxiosError } from 'axios';

export const makeRequest = async <T, R = T>(
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    data?: T
): Promise<R> => {
    try {
        const response: AxiosResponse<R> = await axiosInstance({
            url,
            method,
            ...(data && { data })
        });
        return response.data;
    } catch (error) {

        if (error instanceof AxiosError) {
            console.error(`Erro ao fazer requisição 
            ${method.toUpperCase()} para ${url}:`, error.response?.data
                || error.message);

            throw new Error(error.response?.data?.message
                || 'Erro ao fazer requisição');

        } else {
            console.error(`Erro inesperado ao fazer requisição 
            ${method.toUpperCase()} para ${url}:`, error);
            throw new Error('Erro inesperado');
        }
    }
};
