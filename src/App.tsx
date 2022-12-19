import { cartAPI } from "apis";
import { useEffect } from "react";
import Modal from "react-modal";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import AppRoutes from "routes/Routes";
import { useStore } from "store/globalStore";
import { socket } from "utils";

const App = () => {
  const { currentUser, setNotifications } = useStore((state) => state);
  const { setCarts, setCartsOutOfStock } = useStore((state) => state);
  useQuery({
    queryKey: ["carts"],
    queryFn: () => cartAPI.getAllCart(),
    staleTime: 5 * 60 * 1000,
    onSuccess({ data }) {
      setCarts(data.carts);
      setCartsOutOfStock(data.cartsOutOfStock);
    }
  });
  useEffect(() => {
    if (!currentUser || !currentUser._id) return;
    socket.emit("newUser", currentUser._id);
    socket.on("notifications", (notifications) => setNotifications(notifications));
  }, [currentUser, setNotifications]);
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
Modal.setAppElement("#root");
