import { useEffect, useRef, useState } from "react";

export default function useFetchData(fetcher: any, initialData: any) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleFetchData: any = useRef({});
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await fetcher();
      if (isMounted.current) {
        setData(response.data || null);
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    handleFetchData.current();
  }, []);

  return {
    loading,
    error,
    data,
  };
}
