import { IAxiosAction, IAxiosState } from '@/interfaces/axios';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';

export type DispatchAxios = (params: IAxiosAction) => void;

export function useSearch(): [DispatchAxios, IAxiosState] {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const isMounted = useRef(true);

  const client = axios.create({
    baseURL: process.env.API_URL,
  });

  client.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';

    return config;
  });

  const [state, setState] = useState<IAxiosState>({
    loading: false,
    error: null,
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
        loading: true,
        success: false,
      });

      client(params.config)
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
            });
          }
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
              error,
            });
          }
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
