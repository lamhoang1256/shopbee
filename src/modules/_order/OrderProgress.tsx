import { IOrder, IStatusOrder, OrderStatusCode, OrderStatus, OrderStatusVietnamese } from "@types";
import { IconCheck, IconClipboard, IconMoney, IconShipping } from "components/Icons";
import classNames from "utils/classNames";
import { formatDateVNFull } from "utils/helper";
import { v4 as uuidv4 } from "uuid";

interface OrderStatusProps {
  order: IOrder;
}

const OrderProgress = ({ order }: OrderStatusProps) => {
  const calcWidthActiveStatusBar = () => {
    if (order.statusCode >= OrderStatusCode.delivered) return "after:w-[100%]";
    if (order.statusCode >= OrderStatusCode.shipping) return "after:w-[66%]";
    if (order.statusCode >= OrderStatusCode.processing) return "after:w-[33%]";
    return "after:w-0";
  };
  if (order.status === OrderStatus.canceled) {
    return (
      <div className="grid mt-10 gap-x-6 gap-y-4 md:grid-cols-2">
        <div className="flex items-center gap-3 md:flex-col">
          <div className={classNames("order-status", "border-redff4 text-redff4")}>
            <IconCheck />
          </div>
          <div className="md:text-center">
            <h3>{OrderStatusVietnamese.canceled}</h3>
            <span className="text-[#00000042] text-xs block mt-1">
              {formatDateVNFull(order?.canceledAt)}
            </span>
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-lg">Lý do hủy đơn hàng</h3>
          <p className="text-xs md:text-sm">{order.reasonCancel}</p>
        </div>
      </div>
    );
  }

  const statusList: IStatusOrder[] = [
    {
      icon: <IconClipboard />,
      active: order.statusCode >= OrderStatusCode.waiting,
      status: OrderStatusVietnamese.waiting,
      date: formatDateVNFull(order?.createdAt)
    },
    {
      icon: <IconMoney />,
      active: order.statusCode >= OrderStatusCode.processing,
      status: OrderStatusVietnamese.processing,
      date: formatDateVNFull(order?.createdAt)
    },
    {
      icon: <IconShipping />,
      active: order.statusCode >= OrderStatusCode.shipping,
      status: OrderStatusVietnamese.shipping,
      date: order?.shippingAt ? formatDateVNFull(order?.shippingAt) : "Đang chờ"
    },
    {
      icon: <IconCheck />,
      active: order.statusCode >= OrderStatusCode.delivered,
      status: OrderStatusVietnamese.delivered,
      date: order?.deliveredAt ? formatDateVNFull(order?.deliveredAt) : "Đang chờ"
    }
  ];
  return (
    <div className="mt-10 relative gap-4 mx-auto max-w-[800px] md:text-center">
      <div
        className={classNames(
          "hidden md:block absolute top-[28px] w-3/4 left-1/2 -translate-x-1/2 h-1 bg-[#dbdbdb] after:absolute after:left-0 after:z-10 after:h-1 after:bg-[#2dc258]",
          calcWidthActiveStatusBar()
        )}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {statusList.map((statusItem) => (
          <div className="flex items-center gap-3 md:flex-col" key={uuidv4()}>
            <div
              className={classNames(
                "order-status",
                statusItem.active
                  ? "border-[#2dc258] text-[#2dc258]"
                  : " border-[#dbdbdb] text-[#dbdbdb]"
              )}
            >
              {statusItem.icon}
            </div>
            <div>
              <h3>{statusItem.status}</h3>
              <span className="text-[#00000042] text-xs block mt-1">{statusItem.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
