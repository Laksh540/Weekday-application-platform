import BaseService from "./BaseService";

const url = "/adhoc/getSampleJdJSON";
class JobService extends BaseService {
  getList(body) {
    return this.postRequest(url, body);
  }
}

export default new JobService();
