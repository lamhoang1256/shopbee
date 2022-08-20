import { IOrder } from "@types";
import { orderAPI } from "apis";
import { Loading } from "components/loading";
import { orderStatusLabel } from "constants/global";
import {
  OrderCancel,
  OrderHeader,
  OrderOverview,
  OrderPayment,
  OrderProgress,
  OrderReview,
} from "modules/order";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { scrollToTop } from "utils/helper";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder>(Object);
  const [loading, setLoading] = useState(true);

  const fetchDetailsOrder = async () => {
    setLoading(true);
    try {
      const { data } = await orderAPI.getSingleOrder(id || "");
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsOrder();
    scrollToTop(0);
  }, [id]);
  if (loading) return <Loading />;
  const payments = [
    {
      label: "Tổng tiền hàng",
      value: order.price,
    },
    {
      label: "Phí vận chuyển",
      value: order.shippingFee,
    },
    {
      label: "Voucher từ Shopbee",
      value: order.promotion * -1,
    },
    {
      label: "Tổng thanh toán",
      value: order.total,
    },
  ];

  return (
    <>
      <div className='px-4 py-5 bg-white rounded-md'>
        <OrderHeader id={order._id}>{orderStatusLabel[order.statusCode]}</OrderHeader>
        <OrderProgress order={order} />
        <OrderOverview order={order} />
      </div>
      <OrderCancel statusCode={order.statusCode} fetchDetailsOrder={fetchDetailsOrder} />
      <OrderReview orderItems={order.orderItems} fetchDetailsOrder={fetchDetailsOrder} />
      <OrderPayment payments={payments} />
    </>
  );
};

export default OrderDetailsPage;
