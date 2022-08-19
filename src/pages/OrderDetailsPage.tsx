import { IOrder, OrderStatusCodeEnum } from "@types";
import { orderAPI } from "apis";
import { Button } from "components/button";
import { Loading } from "components/loading";
import { orderStatusLabel } from "constants/global";
import {
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
    setLoading(true);
    try {
      const { data } = await orderAPI.getSingleOrder(id || "");
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const { message, success } = await orderAPI.cancelOrder(id || "");
      if (success) {
        fetchDetailsOrder();
        toast.success(message);
      }
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
      value: order.price + order.shippingFee - order.promotion,
    },
  ];

  return (
    <>
      <div className='px-4 py-5 bg-white rounded-md'>
        <OrderHeader id={order._id}>{orderStatusLabel[order.statusCode]}</OrderHeader>
        <OrderProgress order={order} />
        <OrderOverview order={order} />
      </div>
      <div className='bg-[#fafdff] p-3 flex gap-y-3 md:justify-between flex-col md:flex-row border-dotted border border-[#00000017]'>
        <span className='leading-10 text-xs text-[#0000008a]'>
          Cảm ơn bạn đã mua sắm tại Shopbee!
        </span>
        <div className='flex flex-wrap gap-2'>
          {order.statusCode !== OrderStatusCodeEnum.delivered &&
            order.statusCode !== OrderStatusCodeEnum.canceled && (
              <Button primary onClick={handleCancelOrder}>
                Hủy đơn hàng
              </Button>
            )}
        </div>
      </div>
      <OrderReview orderItems={order.orderItems} fetchDetailsOrder={fetchDetailsOrder} />
      <OrderPayment payments={payments} />
    </>
  );
};

export default OrderDetailsPage;
