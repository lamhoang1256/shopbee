import { useEffect } from "react";
import Modal from "react-modal";
import AppRoutes from "routes/Routes";
import { toast, ToastContainer } from "react-toastify";
import { useStore } from "store/globalStore";
import { cartAPI } from "apis";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:8000");
console.log("socket: ", socket);

socket.on("notifies", (notifies) => console.log("notifies ", notifies));
Modal.setAppElement("#root");

const App = () => {
  const { currentUser, setCart } = useStore((state) => state);
  useEffect(() => {
    socket?.emit("newUser", currentUser._id);
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
