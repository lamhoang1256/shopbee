import { path } from "constants/path";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "store/configStore";

const CheckLoggedIn = () => {
  const { currentUser } = useStore();
  const { accessToken, refreshToken } = currentUser;
  if (currentUser && accessToken && refreshToken) {
    return <Navigate to={path.home} />;
  }
  return <Outlet />;
};

export default CheckLoggedIn;