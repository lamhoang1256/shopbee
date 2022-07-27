import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "constants/path";

export const useCheckLoggedIn = (user: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.email) {
      navigate(path.home);
    }
  }, [user, navigate]);
};
