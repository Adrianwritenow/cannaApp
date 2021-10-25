import axios, { AxiosRequestConfig } from "axios";
import { getSession, useSession } from "next-auth/client";

const secret = process.env.NEXTAUTH_SECRET;

const axiosInstance = axios.create({
  baseURL: "https://dev-cannapages.pantheonsite.io/",
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    // if (config.headers) {
    //   config.headers.Authoization = `Bearer ${token}`;
    // }
    // config.params = config.params || {};
    // config.params["auth"];

    // console.log(config);

    return config;
  }
);

export default axiosInstance;
