import { configAPI } from "apis/configAPI";
import { Loading } from "components/loading";
import { OrderItem } from "modules/order";
import { PurchaseTabs } from "modules/purchase";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "store/configStore";

const OrderPage = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const [orders, setOrders] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const status = searchParams.get("status");
  const handleActive = (value: number) => Number(value) === Number(status);

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.getAllOrder(currentUser?._id);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, [currentUser, status]);
  if (loading) return <Loading />;
  return (
    <>
      <PurchaseTabs handleActive={handleActive} />
      <div>
        {orders.map((order: any) => (
          <OrderItem key={order?._id} order={order} />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
