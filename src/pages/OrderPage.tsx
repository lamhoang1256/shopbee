import { configAPI } from "apis/configAPI";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { OrderItem } from "modules/order";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "store/configStore";

const tabs = [
  { key: 0, display: "Tất cả", to: path.order },
  { key: 1, display: "Đã thanh toán", to: `${path.order}?type=1` },
  { key: 2, display: "Đang giao hàng", to: `${path.order}?type=2` },
  { key: 3, display: "Đã giao", to: `${path.order}?type=3` },
];

const OrderPage = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "";

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
  }, [currentUser, type]);
  if (loading) return <Loading />;
  return (
    <>
      <Tabs tabs={tabs} query={type} />
      {orders.map((order: any) => (
        <OrderItem key={order?._id} order={order} />
      ))}
    </>
  );
};

export default OrderPage;
