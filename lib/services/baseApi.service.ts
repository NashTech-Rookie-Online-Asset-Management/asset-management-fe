import axiosConfig from '@/lib/configs/api.config';
import Http from '@/lib/services/http.service';

class BaseApiService {
  protected httpClient: Http;

  constructor(serviceName: string) {
    this.httpClient = new Http({
      ...axiosConfig,
      baseURL: `/api/${serviceName}`,
    });
  }
}

export default BaseApiService;
