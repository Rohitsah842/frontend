import axios, { Axios, AxiosResponse } from "axios";
import { error } from "console";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: "http://localhost:8082", // our API base URL
  withCredentials: true,
});

api.interceptors.request.use(
  (request) => {
    let customer: any = null;

    let xsrf = sessionStorage.getItem("XSRF-TOKEN");
    if (xsrf) {
      request.headers["X-XSRF-TOKEN"] = xsrf;
    }
    request.headers["X-Requested-With"] = "XMLHttpRequest";
    request.headers["Content-Type"] = "application/json";
    // request.headers["X-XSRF-TOKEN"] = xsrf;

    if (cookies.get("userdetails")!) {
      customer = cookies.get("userdetails");
    }
    if (customer && customer.email && customer.password) {
      const authorization =
        "Basic " + window.btoa(customer.email + ":" + customer.password);
      request.headers.Authorization = authorization;
    } else {
      let authorization = cookies.get("Authorization");

      if (authorization) {
        request.headers.Authorization = authorization;
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
