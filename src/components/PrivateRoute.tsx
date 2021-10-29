import { useContext, useEffect } from "react";

import { AuthContext } from "../authentication/authContext";
import { useRouter } from "next/router";

export default function PrivateRoute({ children }: any) {
  const router = useRouter();
  const authState = useContext(AuthContext);

  const protectedRoutes = ["/user"];

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!authState.state.session.access_token && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("/");
    }
  }, [authState, pathIsProtected]);

  return children;
}
