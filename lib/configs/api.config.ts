import { env } from './env';

const axiosConfigs = {
  development: {
    baseURL: `${env.NEXT_PUBLIC_API_URL}/api/`,
    withCredentials: true,
    timeout: 10000,
  },
  production: {
    baseURL: `${env.NEXT_PUBLIC_API_URL}/api/`,
    withCredentials: true,
    timeout: 10000,
  },
  test: {
    baseURL: `${env.NEXT_PUBLIC_API_URL}/api/`,
    withCredentials: true,
    timeout: 10000,
  },
};
const getAxiosConfig = (): AxiosRequestConfig => {
  const nodeEnv: string = process.env.NODE_ENV;
  return axiosConfigs[nodeEnv as keyof typeof axiosConfigs];
};

const axiosConfig = getAxiosConfig();

export default axiosConfig;
