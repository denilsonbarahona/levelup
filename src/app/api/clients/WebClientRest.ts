import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Interceptors } from './domain/api';
import { ApiResponse, WebClient } from './domain/api';

class WebClientRest implements WebClient {
  private client: Axios;

  constructor(baseUrl: string, options?: Record<string, string>) {
    this.client = axios.create();
    this.setup(baseUrl, options);
  }

  setup(baseUrl: string, options?: Record<string, string>) {
    this.client = axios.create({ baseURL: baseUrl, ...options });
  }

  get<T = any>(
    url: string,
    headers?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.get<T>(url, headers);
  }

  post<T = any>(
    url: string,
    body: Record<string, string>,
    headers?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.post<T>(url, body, headers);
  }

  put<T = any>(
    url: string,
    body: Partial<Record<string, string>>,
    headers?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.put<T>(url, body, headers);
  }

  delete<T = any>(
    url: string,
    headers?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.delete<T>(url, headers);
  }

  patch<T = any>(
    url: string,
    body: Partial<Record<string, string>>,
    headers?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.patch<T>(url, body, headers);
  }

  configureInterceptors(response?: Interceptors, request?: Interceptors) {
    if (response) {
      const { onFulfilled, onRejected } = response;

      const responseFullfield = onFulfilled
        ? onFulfilled
        : this.responseFullfilledIntecerptor;
      const responseRejected = onRejected
        ? onRejected
        : this.responseRejectedInterceptor;

      this.client.interceptors.response.use(
        responseFullfield,
        responseRejected
      );
    }

    if (request) {
      const { onFulfilled, onRejected } = request;

      this.client.interceptors.request.use(onFulfilled, onRejected);
    }
  }

  private responseFullfilledIntecerptor<T>(
    response: AxiosResponse<any, any>
  ): AxiosResponse<ApiResponse<T>> {
    if (response.data) {
      return { ...response, data: response.data, status: response.status };
    }
    return response;
  }

  private responseRejectedInterceptor(error: any) {
    if (error.response.data) {
      return Promise.reject({
        data: error.response.data,
        status: error.response.status,
      });
    }
    return Promise.reject(error);
  }
}

export default WebClientRest;
