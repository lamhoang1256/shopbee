import { IOrder, IStatusOrder } from "@types";
import { IconCheck, IconClipboard, IconMoney, IconShipping } from "components/icons";
import classNames from "utils/className";
import { formatDateVN } from "utils/helper";

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
      <div
        className={classNames(
          "hidden md:block absolute top-[28px] w-3/4 left-1/2 -translate-x-1/2 h-1 bg-[#dbdbdb] after:absolute after:left-0 after:z-10 after:h-1 after:bg-[#2dc258]",
          calcWidthActiveStatusBar(),
        )}
      />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
        {statusList.map((status) => (
          <div className='flex items-center gap-3 md:flex-col' key={status.label}>
            <div
              className={classNames(
                "relative z-20 flex items-center justify-center rounded-full md:w-14 md:h-14 w-12 h-12 border-4 bg-white",
                status.active
                  ? "border-[#2dc258] text-[#2dc258]"
                  : " border-[#dbdbdb] text-[#dbdbdb]",
              )}
            >
              {status.icon}
            </div>
            <div>
              <h3>{status.label}</h3>
              <span className='text-[#00000042] text-xs'>{status.icon}</span>
            </div>
            <div>
              <h3>{status.label}</h3>
              <span className='text-[#00000042] text-xs'>{status.display}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
