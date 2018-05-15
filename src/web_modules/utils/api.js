import axios from "axios";
import Constant from "./constant";

const http = (
  data,
  url,
  type = "POST",
  timeout = 10000,
  root = Constant.API_ROOT,
  isFormData
) => {
  const headers = { "Content-Type": "application/json" };
  if (isFormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  const options = {
    url: url,
    method: type,
    baseURL: root,
    headers: headers,
    timeout: timeout
  };

  if (type === "GET" || type === "DELETE") {
    options.params = data;
  } else {
    options.data = data;
  }
  return axios(options).then(response => {
    let { headers, data, status } = response;
    let token = headers["x-auth-token"];
    let contentType = headers["content-type"];
    if (status !== 200) {
      return Promise.reject(new Error("服务器请求失败"));
    }
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(new Error("the response is not JSON"));
    }
  });
};

export default http;
