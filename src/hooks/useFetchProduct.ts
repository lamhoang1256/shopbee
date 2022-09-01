import { IProduct } from "@types";
import { productAPI } from "apis";
import { useEffect, useState } from "react";

export default function useFetchProduct(id = "") {
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
  }, [id]);
  return {
    loading,
    error,
    product,
    fetchProduct,
  };
}
