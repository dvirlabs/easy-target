import { Target } from "./types";
import axios, { AxiosError } from 'axios';

export const targetToString = (target: Target): string => `${target.ip}:${target.port}`;

export const handleError = (error : any) => {
  if (axios.isAxiosError(error) && error.response) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    const errMsg = error.response.data?.detail || 'An error occurred';
    throw new Error(errMsg);
  } else {
    throw new Error('An unexpected error occurred');
  }
}