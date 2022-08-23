import { IProduct } from "@types";
import { productAPI } from "apis";
import { useEffect, useState } from "react";

export default function useFetchProduct(id = "", top = 0) {
  const [product, setProduct] = useState<IProduct>(Object);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getSingleProduct(id);
      setProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [id]);
  return {
    loading,
    error,
    product,
    fetchProduct,
  };
}
