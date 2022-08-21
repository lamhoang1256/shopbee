import { path } from "constants/path";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "store/configStore";

const ProtectedRoute = () => {
  const { currentUser } = useStore();
  const { accessToken, refreshToken } = currentUser;
  if (!currentUser || !accessToken || !refreshToken) {
    return <Navigate to={path.signIn} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
