import { Target } from './types';
import axios from 'axios';

export const targetToString = (target: Target) => `${target.ip}:${target.port}`;

export const handleError = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
        const errMsg = error?.response?.data?.detail || 'An error occurred';
        throw new Error(errMsg);
    } else {
        throw new Error('An unexpected error occurred');
    }
};
