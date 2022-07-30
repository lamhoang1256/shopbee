import { configAPI } from "apis/configAPI";
import { PurchaseItem, PurchaseTabs } from "modules/purchase";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "store/configStore";

const PurchasePage = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const [purchases, setPurchases] = useState([]);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  console.log("status: ", status);
  const handleActive = (value: number) => Number(value) === Number(status);

  const fetchAllPurchase = async () => {
    try {
      const { data } = await configAPI.getAllPurchase(currentUser?._id, { status });
      console.log("data: ", data);
      setPurchases(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllPurchase();
  }, [currentUser, status]);
  return (
    <div>
      <PurchaseTabs handleActive={handleActive} />
      <div>
        {purchases.map((purchase: any) => (
          <PurchaseItem key={purchase?._id} purchaseInfo={purchase} />
        ))}
      </div>
    </div>
  );
};

export default PurchasePage;
