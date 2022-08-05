import { IconCheck, IconClipboard, IconMoney, IconShipping } from "components/icons";
import { IOrder, IStatusOrder } from "interfaces";
import { formatDateVN } from "utils/helper";
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
  const statusList: IStatusOrder[] = [
    {
      active: true,
      icon: <IconClipboard />,
      label: "Chờ xác nhận",
      display: formatDateVN(order?.paidAt),
    },
    {
      active: order?.isPaid,
      icon: <IconMoney />,
      label: "Đã thanh toán",
      display: formatDateVN(order?.paidAt),
    },
    {
      active: order?.isShipping,
      icon: <IconShipping />,
      label: "Đang vận chuyển",
      display: order?.shippingAt ? formatDateVN(order?.shippingAt) : "Đang chờ",
    },
    {
      active: order?.isDelivered,
      icon: <IconCheck />,
      label: "Giao hàng thành công",
      display: order?.deliveredAt ? formatDateVN(order?.deliveredAt) : "Đang chờ",
    },
  ];

  return (
    <div className='mt-8 relative gap-4 mx-auto max-w-[700px] md:text-center'>
      <OrderStatusBar widthActive={calcWidthActiveStatusBar()} />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
        {statusList.map((status) => (
          <div className='flex items-center gap-3 md:flex-col'>
            <OrderStatusIcon active={status.active}>{status.icon}</OrderStatusIcon>
            <OrderStatusItem label={status.label}>{status.display}</OrderStatusItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
