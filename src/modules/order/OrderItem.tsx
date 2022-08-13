import { Link } from "react-router-dom";
import { IOrder } from "@types";
import { formatMoney } from "utils/helper";
import { Button } from "components/button";
import { ProductPriceSale } from "modules/product";
import OrderProductItem from "./OrderProductItem";

interface OrderItemProps {
  order: IOrder;
}

const renderStatusOrder = (order: IOrder) => {
  if (order.isDelivered) {
    return <span className='text-orangeee4'>Giao hàng thành công</span>;
  }
  if (order.isShipping) {
    return <span className='text-[#06c]'>Đang giao hàng</span>;
  }
  if (order.isPaid) {
    return <span>Đã thanh toán</span>;
  }
  return <span>Chờ xác nhận</span>;
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className='py-4 px-4 md:px-6 mt-3 border border-[#00000017] bg-white rounded'>
      <div className='flex flex-col justify-between gap-2 mt-2 mb-4 md:items-center md:flex-row'>
        <div>
          <span className='font-medium'>Mã đơn hàng: </span>
          <span>{order?._id}</span>
        </div>
        {renderStatusOrder(order)}
      </div>
      <div className='my-3'>
        {order?.orderItems?.map((orderItem) => (
          <OrderProductItem order={orderItem} key={orderItem?._id} />
        ))}
      </div>
      <div className='flex flex-col-reverse justify-between gap-3 mt-5 md:flex-row md:items-center'>
        <Link to={`${order?._id}`}>
          <Button>Xem chi tiết đơn</Button>
        </Link>
        <div>
          <span>Tổng số tiền: </span>
          <ProductPriceSale className='pl-1 text-2xl'>{formatMoney(order?.total)}</ProductPriceSale>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
