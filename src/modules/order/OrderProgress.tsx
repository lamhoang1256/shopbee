import { IOrder, IOrderStatusCode, IStatusOrder, OrderStatusEnum } from "@types";
import { IconCheck, IconClipboard, IconMoney, IconShipping } from "components/icons";
import { orderStatusLabel } from "constants/global";
import classNames from "utils/className";
import { formatDateVNFull } from "utils/helper";
import { v4 as uuidv4 } from "uuid";

interface OrderStatusProps {
  order: IOrder;
}

const OrderProgress = ({ order }: OrderStatusProps) => {
  const calcWidthActiveStatusBar = () => {
    if (order.statusCode >= IOrderStatusCode.delivered) return "after:w-[100%]";
    if (order.statusCode >= IOrderStatusCode.shipping) return "after:w-[66%]";
    if (order.statusCode >= IOrderStatusCode.processing) return "after:w-[33%]";
    return "after:w-0";
  };

  if (order.status === OrderStatusEnum.canceled)
    return (
      <div className='mt-10 md:text-center'>
        <div className='flex items-center gap-3 md:flex-col'>
          <div className={classNames("order-status", "border-redff4 text-redff4")}>
            <IconCheck />
          </div>
          <div>
            <h3>{orderStatusLabel[4]}</h3>
            <span className='text-[#00000042] text-xs block mt-1'>
              {formatDateVNFull(order?.canceledAt)}
            </span>
          </div>
        </div>
      </div>
    );

  const statusList: IStatusOrder[] = [
    {
      icon: <IconClipboard />,
      active: order.statusCode >= IOrderStatusCode.waiting,
      status: orderStatusLabel[0],
      date: formatDateVNFull(order?.createdAt),
    },
    {
      icon: <IconMoney />,
      active: order.statusCode >= IOrderStatusCode.processing,
      status: orderStatusLabel[1],
      date: formatDateVNFull(order?.createdAt),
    },
    {
      icon: <IconShipping />,
      active: order.statusCode >= IOrderStatusCode.shipping,
      status: orderStatusLabel[2],
      date: order?.shippingAt ? formatDateVNFull(order?.shippingAt) : "Đang chờ",
    },
    {
      icon: <IconCheck />,
      active: order.statusCode >= IOrderStatusCode.delivered,
      status: orderStatusLabel[3],
      date: order?.deliveredAt ? formatDateVNFull(order?.deliveredAt) : "Đang chờ",
    },
  ];

  return (
    <div className='mt-10 relative gap-4 mx-auto max-w-[800px] md:text-center'>
      <div
        className={classNames(
          "hidden md:block absolute top-[28px] w-3/4 left-1/2 -translate-x-1/2 h-1 bg-[#dbdbdb] after:absolute after:left-0 after:z-10 after:h-1 after:bg-[#2dc258]",
          calcWidthActiveStatusBar(),
        )}
      />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
        {statusList.map(({ active, icon, status, date }) => (
          <div className='flex items-center gap-3 md:flex-col' key={uuidv4()}>
            <div
              className={classNames(
                "order-status",
                active ? "border-[#2dc258] text-[#2dc258]" : " border-[#dbdbdb] text-[#dbdbdb]",
              )}
            >
              {icon}
            </div>
            <div>
              <h3>{status}</h3>
              <span className='text-[#00000042] text-xs block mt-1'>{date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
