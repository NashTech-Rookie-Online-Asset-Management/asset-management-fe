import Http from '@/lib/services/http.service'
class BaseApiService {
    protected httpClient: Http

    constructor() {
        //TODO: APPLY BASE URL
        this.httpClient = new Http()
    }
}

export default BaseApiService
