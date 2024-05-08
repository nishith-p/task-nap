import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
//import { Bounce, toast } from "react-toastify";

import { API_URL } from "../config";

function requestInterceptor(
  config: AxiosRequestConfig & { headers: AxiosRequestHeaders }
) {
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message;

    // toast.error(message, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   transition: Bounce,
    // });

    console.log(message);

    return Promise.reject(message);
  }
);
