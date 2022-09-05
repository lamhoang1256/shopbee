import { cartAPI } from "apis";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

export default function useFetchCarts() {
  const { setCarts } = useStore((state) => state);
  const fetchCarts = async () => {
    try {
      const { data } = await cartAPI.getAllCart();
      setCarts(data);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchCarts();
  }, []);
  return {
    fetchCarts,
  };
}
