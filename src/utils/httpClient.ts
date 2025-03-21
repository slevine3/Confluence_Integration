import axios, { InternalAxiosRequestConfig } from 'axios';
import config from '../config';

export const createHttpClient = (accessToken: string, cloudId: string) => {
  const client = axios.create({
    baseURL: `https://api.atlassian.com/ex/confluence/${cloudId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });

  // Request interceptor
  client.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    console.log('Request:', {
      method: request.method,
      url: (request.baseURL || '') + (request.url || ''),
      headers: request.headers,
      params: request.params,
      data: request.data
    });
    return request;
  });

  // Response interceptor
  client.interceptors.response.use(
    response => {
      console.log('Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      return response;
    },
    error => {
      console.error('Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config
      });
      return Promise.reject(error);
    }
  );

  return client;
}; 