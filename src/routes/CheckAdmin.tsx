import { IDecodedToken } from "@types";
import jwtDecode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "store/globalStore";

const CheckAdmin = () => {
  const { currentUser } = useStore();
  const { accessToken } = currentUser;
  const decodedJwt: IDecodedToken = jwtDecode(accessToken);
  if (currentUser && !decodedJwt.isAdmin) {
    return <Navigate to='/404' />;
  }
  return <Outlet />;
};

export default CheckAdmin;
