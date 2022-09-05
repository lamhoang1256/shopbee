import { useEffect } from "react";
import Modal from "react-modal";
import AppRoutes from "routes/Routes";
import { toast, ToastContainer } from "react-toastify";
import { useStore } from "store/globalStore";
import { cartAPI } from "apis";
import * as io from "socket.io-client";

export const socket = io.connect("http://localhost:8000");
Modal.setAppElement("#root");

const App = () => {
  const { currentUser, setCart, setNotifications } = useStore((state) => state);
  useEffect(() => {
    socket?.emit("newUser", currentUser?._id);
    socket?.emit("getNotifications", currentUser?._id);
    socket.on("notifications", (notifications) => setNotifications(notifications));
  }, [socket, currentUser]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await cartAPI.getAllCart();
        setCart(data);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    if (currentUser?.email) fetchCart();
  }, [currentUser]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
