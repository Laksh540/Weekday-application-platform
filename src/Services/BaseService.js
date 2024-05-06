const baseUrl = "https://api.weekday.technology";

class BaseService {
  //   constructor(props) {}
  postRequest(url, body) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    return fetch(`${baseUrl}${url}`, requestOptions);
  }
}

export default BaseService;
