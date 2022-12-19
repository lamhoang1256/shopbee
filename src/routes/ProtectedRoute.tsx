import { PATH } from "constants/path";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "store/globalStore";

const ProtectedRoute = () => {
  const { currentUser } = useStore();
  const accessToken = currentUser?.accessToken;
  const refreshToken = currentUser?.refreshToken;
  if (!currentUser || !accessToken || !refreshToken) {
    return <Navigate to={PATH.signIn} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
