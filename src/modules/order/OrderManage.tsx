import { orderAPI } from "apis";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderItem from "./OrderItem";

const tabs = [
  { key: 0, display: "Tất cả", to: path.orderManage },
  { key: 1, display: "Đã thanh toán", to: `${path.orderManage}?status=1` },
  { key: 2, display: "Đang giao hàng", to: `${path.orderManage}?status=2` },
  { key: 3, display: "Đã giao hàng", to: `${path.orderManage}?status=3` },
];

const OrderManage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const status = searchParams.get("status") || "";

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const params = status ? { status } : {};
      const { data } = await orderAPI.getAllOrderByAdmin(params);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, [status]);
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

export default OrderManage;
