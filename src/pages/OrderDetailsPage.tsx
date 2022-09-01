import { IOrder, OrderStatusLabel } from "@types";
import { orderAPI } from "apis";
import { SectionWhite } from "components/common";
import { Loading } from "components/loading";
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
import { toast } from "react-toastify";
import { scrollToTop } from "utils/helper";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder>(Object);
  const [loading, setLoading] = useState(true);

  const fetchDetailsOrder = async () => {
    try {
      setLoading(true);
      const { data } = await orderAPI.getSingleOrder(id || "");
      setOrder(data);
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetailsOrder();
    scrollToTop(0);
  }, [id]);

  if (loading) return <Loading />;
  return (
    <>
      <SectionWhite>
        <OrderHeader orderId={order._id}>{OrderStatusLabel[order.status]}</OrderHeader>
        <OrderProgress order={order} />
        <OrderOverview order={order} />
      </SectionWhite>
      <OrderCancel status={order.status} fetchDetailsOrder={fetchDetailsOrder} />
      <OrderReview orderItems={order.orderItems} />
      <OrderPayment
        price={order.price}
        shippingFee={order.shippingFee}
        promotion={order.promotion}
        total={order.total}
      />
    </>
  );
};

export default OrderDetailsPage;
