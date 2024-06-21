/* eslint-disable @typescript-eslint/consistent-type-imports */
type AxiosRequestConfig = import('axios').AxiosRequestConfig;

interface IAuthToken {
  access_token?: string;
  refresh_token?: string;
  access_token_expires_in?: number;
  access_token_expires_at?: number;
}

type ApiDataError = {
  error?: string;
  message?: string;
  statusCode: number;
};

type AppAxiosError = import('axios').AxiosError<ApiDataError, any>;

type GetList<T> = {
  data: T[];
  pagination: {
    totalPages: number;
    totalCount: number;
  };
};
