import { path } from "constants/path";
import { IOrder } from "interfaces/order";
import OrderProductItem from "modules/order/OrderProductItem";
import { ProductPriceSale } from "modules/product";
import { Link } from "react-router-dom";
import { formatMoney } from "utils/helper";

interface PurchaseItemProps {
  orders: IOrder;
}

const PurchaseItem = ({ orders }: PurchaseItemProps) => {
  const totalPayment = orders.totalPriceProduct + orders.shippingPrice - orders.totalDiscount;
  return (
    <div className='p-4 mt-3'>
      <span>Đang chờ xác nhận</span>
      <div className='my-3 border-b border-t border-[#00000017]'>
        {orders?.orderItems?.map((orderItem) => (
          <OrderProductItem order={orderItem} />
        ))}
      </div>
      <div className='flex items-center justify-between mt-5'>
        <Link to={`${path.order}/${orders?._id}`}>
          <button type='button' className='p-2 border border-slate-200'>
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
