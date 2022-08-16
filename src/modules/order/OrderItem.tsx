import { Link } from "react-router-dom";
import { IOrder, IOrderStatusCode } from "@types";
import { formatMoney } from "utils/helper";
import { Button } from "components/button";
import { ProductPriceSale } from "modules/product";
import OrderProduct from "./OrderProduct";

interface OrderItemProps {
  order: IOrder;
}

const renderStatusOrderWithColor = (statusCode: number) => {
  switch (statusCode) {
    case IOrderStatusCode.processing:
      return <span className='text-yellow-400'>ĐANG XỬ LÍ</span>;
    case IOrderStatusCode.shipping:
      return <span className='text-blue-500'>ĐANG GIAO HÀNG</span>;
    case IOrderStatusCode.delivered:
      return <span className='text-[#2dc258]'>ĐÃ GIAO HÀNG</span>;
    case IOrderStatusCode.canceled:
      return <span className='text-redff4'>ĐÃ HỦY</span>;
    default:
      return <span className='text-orangeee4'>ĐANG CHỜ XỬ LÍ</span>;
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className='py-4 px-4 md:px-6 mt-3 border border-[#00000017] bg-white rounded'>
      <div className='flex flex-col justify-between gap-2 mt-2 mb-4 md:items-center md:flex-row'>
        <div>
          <span className='font-medium'>Mã đơn hàng: </span>
          <span>{order?._id}</span>
        </div>
        {renderStatusOrderWithColor(order.statusCode)}
      </div>
      <div className='my-3'>
        {order?.orderItems?.map((orderItem) => (
          <OrderProduct order={orderItem} key={orderItem?.product._id} />
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
