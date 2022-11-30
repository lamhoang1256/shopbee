import { cartAPI } from "apis";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

export default function useFetchCarts() {
  const { setCarts, setCartsOutOfStock, currentUser } = useStore((state) => state);
  const fetchCarts = async () => {
    try {
      const { data } = await cartAPI.getAllCart();
      setCarts(data.carts);
      setCartsOutOfStock(data.cartsOutOfStock);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    if (currentUser?._id) fetchCarts();
  }, [currentUser]);
  return {
    fetchCarts
  };
}
