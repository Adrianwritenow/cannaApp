import { AxiosRequestConfig } from 'axios';

export interface IAxiosBatchRequest {
  key: string;
}

export interface IAxiosAction {
  type: string;
  config: AxiosRequestConfig;
  redirectOnSuccess?: string;
  redirectOnFailed?: string;
  data?: Record<string, any>;
  response?: Record<string, any>;
  batchOrder?: IAxiosBatchRequest[];
}

export interface IAxiosState {
  loading: boolean;
  error: any;
  success: boolean;
  data?: any;
  response?: any;
}

export interface IAxiosReturn {
  success: boolean;
  error: any;
  response: any;
}
