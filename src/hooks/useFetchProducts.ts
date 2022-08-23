import { IPagination, IProduct, ISearchParams } from "@types";
import { productAPI } from "apis";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useFetchProducts(params?: Partial<ISearchParams>, top = 0) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAllProduct({ ...currentParams, ...params });
      setProducts(data?.products);
      setPagination(data?.pagination);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [searchParams]);
  return {
    loading,
    error,
    products,
    pagination,
    fetchProducts,
    setSearchParams,
  };
}
