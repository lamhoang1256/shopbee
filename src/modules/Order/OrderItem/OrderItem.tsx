import { IOrderDetails, OrderStatusCode } from "@types";
import Button from "components/Button";
import OrderProduct from "modules/Order/OrderProduct";
import { ProductPriceSale } from "modules/Product/ProductPrice";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface OrderItemProps {
  order: IOrderDetails;
}

const renderStatusOrderWithColor = (statusCode: number) => {
  switch (statusCode) {
    case OrderStatusCode.processing:
      return <span className="text-yellow-400">ĐANG XỬ LÍ</span>;
    case OrderStatusCode.shipping:
      return <span className="text-blue-500">ĐANG GIAO HÀNG</span>;
    case OrderStatusCode.delivered:
      return <span className="text-[#2dc258]">ĐÃ GIAO HÀNG</span>;
    case OrderStatusCode.canceled:
      return <span className="text-redff4">ĐÃ HỦY</span>;
    default:
      return <span className="text-orangeee4">ĐANG CHỜ XỬ LÍ</span>;
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  if (!order) return null;
  return (
    <div className="px-4 py-4 mt-3 bg-white border rounded md:px-6 border-black017">
      <div className="flex flex-col justify-between gap-2 mt-2 mb-4 md:items-center md:flex-row">
        <div>
          <span className="font-medium">Mã đơn hàng: </span>
          <span>{order._id}</span>
        </div>
        {renderStatusOrderWithColor(order.statusCode)}
      </div>
      <div className="my-3">
        {order.orderItems?.map((orderItem) => (
          <OrderProduct order={orderItem} key={uuidv4()} />
        ))}
      </div>
      <div className="flex flex-col-reverse justify-between gap-3 mt-5 md:flex-row md:items-center">
        <Link to={`${order._id}`}>
          <Button>Xem chi tiết đơn</Button>
        </Link>
        <div>
          <span>Tổng số tiền: </span>
          <ProductPriceSale className="pl-1 text-lg lg:text-2xl">{order.total}</ProductPriceSale>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
