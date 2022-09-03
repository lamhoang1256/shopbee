import { useEffect } from "react";
import Modal from "react-modal";
import AppRoutes from "routes/Routes";
import { toast, ToastContainer } from "react-toastify";
import { useStore } from "store/configStore";
import { cartAPI } from "apis";

Modal.setAppElement("#root");

const App = () => {
  const { currentUser, setCart } = useStore((state) => state);
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
