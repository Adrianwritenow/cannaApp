import { AuthContext, getClient } from "../authentication/authContext";
import { AxiosError, AxiosResponse } from "axios";
import { IAxiosAction, IAxiosState } from "../interfaces/axios";
// @todo: Implement some kind of caching.
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";

export type DispatchAxios = (params: IAxiosAction) => void;

export function useAxios(): [DispatchAxios, IAxiosState] {
  const dispatch = useDispatch();
  const authState = useContext(AuthContext);
  const isMounted = useRef(true);
  const axios = getClient(authState);

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

      axios(params.config)
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
    [isMounted, dispatch, state, axios]
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  return [dispatchAxios, state];
}
