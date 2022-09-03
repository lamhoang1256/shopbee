import { PATH } from "constants/path";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "store/globalStore";

const CheckLoggedIn = () => {
  const { currentUser } = useStore();
  const { accessToken, refreshToken } = currentUser;
  if (currentUser && accessToken && refreshToken) {
    return <Navigate to={PATH.home} />;
  }
  return <Outlet />;
};

export default CheckLoggedIn;
