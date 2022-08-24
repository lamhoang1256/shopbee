import { ICategory } from "@types";
import { categoryAPI } from "apis";
import { useEffect, useState } from "react";

export default function useFetchCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await categoryAPI.getAllCategory();
      setCategories(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return {
    loading,
    error,
    categories,
    fetchCategories,
  };
}
