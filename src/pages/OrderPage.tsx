import { configAPI } from "apis/configAPI";
import { PurchaseItem, PurchaseTabs } from "modules/purchase";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "store/configStore";

const OrderPage = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const [orders, setOrders] = useState([]);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const handleActive = (value: number) => Number(value) === Number(status);

  const fetchAllOrder = async () => {
    try {
      const { data } = await configAPI.getAllOrder(currentUser?._id);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, [currentUser, status]);
  return (
    <div>
      <PurchaseTabs handleActive={handleActive} />
      <div>
        {orders.map((purchase: any) => (
          <PurchaseItem key={purchase?._id} orders={purchase} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
