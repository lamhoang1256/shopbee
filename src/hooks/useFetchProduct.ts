import { IProduct } from "@types";
import { productAPI } from "apis";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetchProduct(id = "") {
  const [product, setProduct] = useState<IProduct>(Object);
  const [loading, setLoading] = useState(true);
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await productAPI.getSingleProduct(id);
      setProduct(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  return {
    loading,
    product,
    fetchProduct
  };
}
