import { IOrder, IStatusOrder } from "@types";
import { IconCheck, IconClipboard, IconMoney, IconShipping } from "components/icons";
import classNames from "utils/className";
import { formatDateVNFull } from "utils/helper";

interface OrderStatusProps {
  order: IOrder;
}

const OrderStatus = ({ order }: OrderStatusProps) => {
  const calcWidthActiveStatusBar = () => {
    if (order.status === "delivered") return "after:w-[100%]";
    if (order.status === "shipping") return "after:w-[70%]";
    if (order.status === "processing") return "after:w-[30%]";
    return "after:w-0";
  };
  const statusList: IStatusOrder[] = [
    {
      active: true,
      icon: <IconClipboard />,
      label: "Chờ xác nhận",
      display: formatDateVNFull(order?.createdAt),
    },
    {
      active: order.status === "processing",
      icon: <IconMoney />,
      label: "Đã thanh toán",
      display: formatDateVNFull(order?.createdAt),
    },
    {
      active: order.status === "shipping",
      icon: <IconShipping />,
      label: "Đang vận chuyển",
      display: order?.shippingAt ? formatDateVNFull(order?.shippingAt) : "Đang chờ",
    },
    {
      active: order.status === "delivered",
      icon: <IconCheck />,
      label: "Giao hàng thành công",
      display: order?.deliveredAt ? formatDateVNFull(order?.deliveredAt) : "Đang chờ",
    },
  ];

  return (
    <div className='mt-8 relative gap-4 mx-auto max-w-[700px] md:text-center'>
      <div
        className={classNames(
          "hidden md:block absolute top-[28px] w-3/4 left-1/2 -translate-x-1/2 h-1 bg-[#dbdbdb] after:absolute after:left-0 after:z-10 after:h-1 after:bg-[#2dc258]",
          calcWidthActiveStatusBar(),
        )}
      />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
        {statusList.map(({ label, active, icon, display }) => (
          <div className='flex items-center gap-3 md:flex-col' key={label}>
            <div
              className={classNames(
                "order-status",
                active ? "border-[#2dc258] text-[#2dc258]" : " border-[#dbdbdb] text-[#dbdbdb]",
              )}
            >
              {icon}
            </div>
            <div>
              <h3>{label}</h3>
              <span className='text-[#00000042] text-xs'>{display}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
