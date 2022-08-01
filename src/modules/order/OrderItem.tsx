import { ButtonNormal } from "components/button";
import { path } from "constants/path";
import { IOrder } from "interfaces/order";
import OrderProductItem from "modules/order/OrderProductItem";
import { ProductPriceSale } from "modules/product";
import { Link } from "react-router-dom";
import { formatMoney } from "utils/helper";

interface PurchaseItemProps {
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

const PurchaseItem = ({ order }: PurchaseItemProps) => {
  const totalPayment = order.totalPriceProduct + order.shippingPrice - order.totalDiscount;
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
        <Link to={`${path.order}/${order?._id}`}>
          <ButtonNormal>Xem chi tiết đơn</ButtonNormal>
        </Link>
        <div>
          <span>Tổng số tiền: </span>
          <ProductPriceSale className='pl-1 text-2xl'>{formatMoney(totalPayment)}</ProductPriceSale>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItem;