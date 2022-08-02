import { IconCheck, IconClipboard, IconMoney, IconShipping } from "components/icons";
import { IOrder } from "interfaces";
import OrderStatusBar from "./OrderStatusBar";
import OrderStatusIcon from "./OrderStatusIcon";
import OrderStatusItem from "./OrderStatusItem";

interface OrderStatusProps {
  order: IOrder;
}

const OrderStatus = ({ order }: OrderStatusProps) => {
  const calcWidthActiveStatusBar = () => {
    if (order?.isPaid && order?.isShipping && order?.isDelivered) return "after:w-[100%]";
    if (order?.isPaid && order?.isShipping) return "after:w-[70%]";
    if (order?.isPaid) return "after:w-[30%]";
    return "after:w-0";
  };
  return (
    <div className='mt-8 relative gap-4 mx-auto max-w-[700px] md:text-center'>
      <OrderStatusBar widthActive={calcWidthActiveStatusBar()} />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
        <div className='flex items-center gap-3 md:flex-col'>
          <OrderStatusIcon active>
            <IconClipboard />
          </OrderStatusIcon>
          <OrderStatusItem label='Chờ xác nhận'>
            {new Date(order?.paidAt).toLocaleDateString()}
          </OrderStatusItem>
        </div>
        <div className='flex items-center gap-3 md:flex-col'>
          <OrderStatusIcon active={order?.isPaid}>
            <IconMoney />
          </OrderStatusIcon>
          <OrderStatusItem label='Đã thanh toán'>
            {new Date(order?.paidAt).toLocaleDateString()}
          </OrderStatusItem>
        </div>
        <div className='flex items-center gap-3 md:flex-col'>
          <OrderStatusIcon active={order?.isShipping}>
            <IconShipping />
          </OrderStatusIcon>
          <OrderStatusItem label='Đang vận chuyển'>
            {order?.shippingAt ? new Date(order?.shippingAt).toLocaleDateString() : "Đang chờ"}
          </OrderStatusItem>
        </div>
        <div className='flex items-center gap-3 md:flex-col'>
          <OrderStatusIcon active={order?.isDelivered}>
            <IconCheck />
          </OrderStatusIcon>
          <OrderStatusItem label='Giao hàng thành công'>
            {order?.deliveredAt ? new Date(order?.deliveredAt).toLocaleDateString() : "Đang chờ"}
          </OrderStatusItem>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
