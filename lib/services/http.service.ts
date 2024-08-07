/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';

import axiosConfig from '@/lib/configs/api.config';

/** @class */
export default class HttpService {
  private instance: AxiosInstance;

  constructor(config = axiosConfig) {
    const axiosConfigs = config;

    const instance = axios.create({ ...axiosConfigs });
    Object.assign(instance, this.setupInterceptorsTo(instance));
    this.instance = instance;
  }

  private onRequest = async (config: AxiosRequestConfig) => {
    // const token = localStorageService.get(StoreKeys.ACCESS_TOKEN, '')
    // if (token) {
    //     config.headers = {
    //         ...config.headers,
    //         Authorization: `Bearer ${token}`,
    //     }
    // }
    return config;
  };

  private onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  private onResponse = (response: AxiosResponse) => {
    return response.data;
  };

  private onResponseError = (error: AxiosError): Promise<AxiosError> => {
    // const statusCode = error?.response?.status
    // switch (statusCode) {
    //     case HttpStatusCode.UNAUTHORIZED: {
    //         if (
    //             typeof window !== 'undefined' &&
    //             !window.location.pathname.startsWith('/sign') // /^\/(sign)(in|up)$/
    //         )
    //             window.location.replace('/signin')
    //         break
    //     }
    // }
    return Promise.reject(error);
  };

  private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(
      // @ts-ignore
      this.onRequest,
      this.onRequestError,
    );
    axiosInstance.interceptors.response.use(
      this.onResponse,
      this.onResponseError,
    );
    return axiosInstance;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.instance.get<T>(`${url}`, config)) as T;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return (await this.instance.post<T>(url, data, config)) as T;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config) as T;
  }

  public async patch<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return (await this.instance.patch<T>(url, data, config)) as T;
  }

  public async delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }

  public setHttpConfigs(config?: Partial<AxiosRequestConfig>) {
    if (config?.baseURL) {
      this.instance.defaults = {
        ...this.instance.defaults,
        baseURL: config.baseURL,
      };
    }
  }
}
