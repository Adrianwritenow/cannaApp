import axios, { AxiosRequestConfig } from "axios";

const secret = process.env.NEXTAUTH_SECRET;

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    config.params = config.params || {};
    config.params["auth"];
    return config;
  }
);

export default axiosInstance;
