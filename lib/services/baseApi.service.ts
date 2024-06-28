import axiosConfig from '@/lib/configs/api.config';
import Http from '@/lib/services/http.service';

class BaseApiService {
  protected httpConfig: AxiosRequestConfig;

  protected httpClient: Http;

  protected serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.httpConfig = {
      ...axiosConfig,
      baseURL: `/api/${this.serviceName}`,
    };
    this.httpClient = new Http(this.httpConfig);
  }

  newHttpClient() {
    this.httpClient = new Http(this.httpConfig);
    return this;
  }

  setBaseUrl(baseUrl: string) {
    this.httpConfig.baseURL = baseUrl;
    return this;
  }

  setBearerToken(bearerToken: string) {
    this.httpConfig.headers = {
      Authorization: `Bearer ${bearerToken}`,
    };
    return this;
  }

  setHttpConfig(httpConfig: AxiosRequestConfig) {
    this.httpConfig = httpConfig;
    return this;
  }

  useServer() {
    this.httpConfig.baseURL = new URL(
      `${process.env.API_URL || ''}/api/${this.serviceName}`,
    ).toString();
    return this.newHttpClient();
  }
}

export default BaseApiService;
