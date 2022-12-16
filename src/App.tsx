import { Meta } from "components/_meta";
import useFetchCarts from "hooks/useFetchCarts";
import { useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import AppRoutes from "routes/Routes";
import { useStore } from "store/globalStore";
import { socket } from "utils/socket";

const App = () => {
  const { currentUser, setNotifications } = useStore((state) => state);
  useFetchCarts();
  useEffect(() => {
    if (!currentUser?._id) return;
    socket.emit("newUser", currentUser._id);
    socket.on("notifications", (notifications) => setNotifications(notifications));
  }, [currentUser, setNotifications]);
  return (
    <>
      <Meta />
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
Modal.setAppElement("#root");
