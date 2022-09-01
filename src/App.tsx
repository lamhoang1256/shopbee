import { useEffect } from "react";
import Modal from "react-modal";
import AppRoutes from "routes/Routes";
import { ToastContainer } from "react-toastify";
import { useStore } from "store/configStore";
import { cartAPI } from "apis";

Modal.setAppElement("#root");

const App = () => {
  const { currentUser, setCart } = useStore((state) => state);
  const fetchCart = async () => {
    try {
      const { data, success } = await cartAPI.getAllCart();
      if (success) setCart(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser?.email) {
      fetchCart();
    }
  }, [currentUser]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
