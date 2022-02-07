import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { IAxiosAction, IAxiosState } from '@/interfaces/axios';

export type DispatchAxios = (params: IAxiosAction) => Promise<any>;

export function useAxios(
  internal: boolean = true
): [DispatchAxios, IAxiosState] {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const isMounted = useRef(true);

  const client = axios.create({
    baseURL: process.env.API_URL,
  });

  client.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';

    // Internal requests need tokens and other parameters added in.
    if (internal) {
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }

      if (session?.provider) {
        config.url += `?_format=json&auth_type=${session.provider}`;
      } else {
        config.url += `?_format=json`;
      }
    }

    return config;
  });

  const [state, setState] = useState<IAxiosState>({
    loading: false,
    error: null,
    response: null,
    success: false,
  });

  const dispatchAxios: DispatchAxios = useCallback(
    (params: IAxiosAction) => {
      const action: IAxiosAction = {
        type: params.type,
        config: params.config,
      };

      if (params.data) {
        action.data = params.data;
      }

      dispatch({
        ...action,
        loading: true,
      });

      setState({
        ...state,
        error: null,
        response: null,
        loading: true,
        success: false,
      });

      return client(params.config)
        .then((response: AxiosResponse) => {
          // dispatch must come before setState
          dispatch({
            ...action,
            response,
            loading: false,
          });
          if (isMounted.current) {
            setState({
              ...state,
              loading: false,
              success: true,
              error: null,
              response,
            });
          }

          return {
            success: true,
            error: null,
            response,
          };
        })
        .catch((error: AxiosError) => {
          // dispatch must come before setState
          dispatch({
            ...action,
            error,
            loading: false,
            success: false,
          });

          if (isMounted.current) {
            setState({
              ...state,
              loading: false,
              success: false,
              response: null,
              error,
            });
          }

          return {
            success: false,
            response: null,
            error,
          };
        });
    },
    [isMounted, dispatch, state, client]
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  return [dispatchAxios, state];
}
