import { useAppDispatch } from "../store/hooks";
import { clearToken } from "../store/tokenSlice";
import { clearUser } from "../store/userSlice";

function useLogout() {
  const dispatch = useAppDispatch();

  async function logout() {
    dispatch(clearUser({}));
    dispatch(clearToken());
  }

  return logout;
}

export default useLogout;
