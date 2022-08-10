import { orderAPI } from "apis";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { OrderItem } from "modules/order";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "store/configStore";

const tabs = [
  { key: 0, display: "Tất cả", to: path.order },
  { key: 1, display: "Đã thanh toán", to: `${path.order}?status=1` },
  { key: 2, display: "Đang giao hàng", to: `${path.order}?status=2` },
  { key: 3, display: "Đã giao hàng", to: `${path.order}?status=3` },
];

const OrderPage = () => {
  const { currentUser } = useStore((state) => state);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const status = searchParams.get("status") || "";

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const params = status ? { status } : {};
      const { data } = await orderAPI.getAllOrder(currentUser?._id, params);
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
      <Tabs tabs={tabs} query={status} />
      {orders.map((order: any) => (
        <OrderItem key={order?._id} order={order} />
      ))}
    </>
  );
};

export default OrderPage;
