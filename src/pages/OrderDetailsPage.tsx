import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IOrder, OrderStatusEnum } from "@types";
import { orderAPI } from "apis";
import { Loading } from "components/loading";
import { OrderOverview, OrderPayment, OrderProduct, OrderProgress } from "modules/order";
import { Button } from "components/button";
import { orderStatusLabel } from "constants/global";
import { toast } from "react-toastify";

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
        <div className='flex flex-col justify-between md:items-center md:flex-row'>
          <h3 className='text-lg font-medium'>Quản lí đơn hàng</h3>
          <span>
            ID ĐƠN HÀNG: {order?._id} |{" "}
            <span className='text-orangeee4'>
              {orderStatusLabel[order.statusCode].toUpperCase()}
            </span>
          </span>
        </div>
        <OrderProgress order={order} />
        <OrderOverview order={order} />
      </div>
      <div className='bg-[#fffcf5] p-3 flex gap-y-3 md:justify-between flex-col md:flex-row border-dotted border border-[rgba(0,0,0,.09)]'>
        <span className='leading-10 text-xs text-[#0000008a]'>
          Cảm ơn bạn đã mua sắm tại Shopbee!
        </span>
        <div className='flex flex-wrap gap-2'>
          <Button>Lấy mã đơn hàng</Button>
          {order.status !== OrderStatusEnum.delivered && order.status !== OrderStatusEnum.canceled && (
            <Button primary onClick={handleCancelOrder}>
              Hủy đơn hàng
            </Button>
          )}
        </div>
      </div>
      <div className='p-4 mt-4 bg-white rounded-md'>
        {order?.orderItems.map((orderItem) => (
          <OrderProduct order={orderItem} key={orderItem.product._id} />
        ))}
      </div>
      <OrderPayment payments={payments} />
    </>
  );
};

export default OrderDetailsPage;
