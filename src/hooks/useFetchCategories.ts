import { ICategory } from "@types";
import { categoryAPI } from "apis";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetchCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoryAPI.getAllCategory();
      setCategories(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return {
    loading,
    categories,
    fetchCategories,
  };
}
