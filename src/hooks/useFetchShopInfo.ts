import { IShopInfo } from "@types";
import { shopAPI } from "apis";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetchShopInfo() {
  const [shopInfo, setShopInfo] = useState<IShopInfo>(Object);
  const fetchShopInfo = async () => {
    try {
      const { data } = await shopAPI.getShopInfo();
      setShopInfo(data);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchShopInfo();
  }, []);
  return {
    shopInfo,
    setShopInfo,
    fetchShopInfo
  };
}
