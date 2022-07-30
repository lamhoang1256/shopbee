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
  if (order.isDelivered) return <span className='text-[#2dc258]'>Giao hàng thành công</span>;
  if (order?.isShipping) return <span className='text-[#06c]'>Đang giao hàng</span>;
  if (order.isPaid) return <span>Đã thanh toán</span>;
  return <span>Chờ xác nhận</span>;
};

const PurchaseItem = ({ order }: PurchaseItemProps) => {
  const totalPayment = order.totalPriceProduct + order.shippingPrice - order.totalDiscount;
  return (
    <div className='py-4 px-6 mt-3 border border-[#00000017] bg-white rounded'>
      <div className='font-medium'>{renderStatusOrder(order)}</div>
      <div className='my-3'>
        {order?.orderItems?.map((orderItem) => (
          <OrderProductItem order={orderItem} />
        ))}
      </div>
      <div className='flex items-center justify-between mt-5'>
        <Link to={`${path.order}/${order?._id}`}>
          <button type='button' className='py-2 px-4 border border-[#00000017]'>
            Xem chi tiết đơn
          </button>
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
