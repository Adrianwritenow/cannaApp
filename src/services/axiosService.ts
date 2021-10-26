import axios, { AxiosRequestConfig } from "axios";

const secret = process.env.NEXTAUTH_SECRET;

const axiosInstance = axios.create({
  baseURL: "https://dev-cannapages.pantheonsite.io/",
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    config.params = config.params || {};
    config.params["auth"];

    console.log("CONFIG:::", config);

    return config;
  }
);

export default axiosInstance;
