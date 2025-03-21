import axios, { AxiosRequestConfig, Method } from 'axios';

interface RequestOptions extends AxiosRequestConfig {
  method: Method;
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  baseURL?: string;
}

export async function axiosRequest<T = any>(options: RequestOptions): Promise<T> {
  try {
    const response = await axios({
      method: options.method,
      url: options.url,
      baseURL: options.baseURL,
      headers: options.headers,
      params: options.params,
      data: options.data,
      timeout: options.timeout || 10000, // optional timeout
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Request failed with status ${error.response.status}: ${JSON.stringify(error.response.data)}`
      );
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
}
