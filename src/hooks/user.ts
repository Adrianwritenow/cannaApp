import { RootState } from "../reducers";
import { getCurrentUser } from "../actions/user";
import { useAxios } from "../hooks/useAxios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function useCurrentUser(hydrate: boolean = false) {
  const [dispatchAxios, { loading }] = useAxios();
  const { currentUser } = useSelector((root: RootState) => root.user);

  useEffect(() => {
    if (hydrate && !loading) {
      console.log("GETTIN");
      dispatchAxios(getCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return [currentUser, loading];
}
