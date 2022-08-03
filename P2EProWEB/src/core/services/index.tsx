import axios, { AxiosResponse } from 'axios';

const SERVER_URL = "http://localhost:5000";

export const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 15000,
});

export  const responseBody = (response: AxiosResponse) => response.data;
