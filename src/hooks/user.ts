import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../authentication/authContext";
import { RootState } from "../reducers";
import { getCurrentUser } from "../actions/user";
import jwt_decode from "jwt-decode";
import { useAxios } from "../hooks/useAxios";
import { useSelector } from "react-redux";

interface DecodedToken {
  aud: string;
  exp: string;
  iat: string;
  jti: string;
  nbf: string;
  scopes: [string];
  sub: string;
}

export function useCurrentUser(hydrate: boolean = false) {
  const [dispatchAxios, { loading }] = useAxios();
  const { currentUser } = useSelector((root: RootState) => root.user);
  const authState = useContext(AuthContext);
  const [access_token] = useState(authState.state.session.access_token);

  useEffect(() => {
    if (hydrate && !loading && access_token) {
      var decoded: DecodedToken = jwt_decode(access_token);
      dispatchAxios(getCurrentUser(decoded.sub));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);

  return [currentUser, loading];
}
