import { IPagination, IProduct, IProductSearchParams } from "@types";
import { productAPI } from "apis";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useFetchProducts(params?: Partial<IProductSearchParams>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await productAPI.getAllProduct({ ...currentParams, ...params });
      setProducts(data?.products);
      setPagination(data?.pagination);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);
  return {
    loading,
    products,
    pagination,
    fetchProducts,
    setSearchParams,
    searchParams,
    currentParams
  };
}
