import { AxiosRequestConfig } from "axios";

export interface IAxiosAction {
  type: string;
  config: AxiosRequestConfig;
  redirectOnSuccess?: string;
  redirectOnFailed?: string;
  data?: Record<string, any>;
  response?: Record<string, any>;
}

export interface IAxiosState {
  loading: boolean;
  error: any;
  success: boolean;
  data?: any;
  response?: any;
}
