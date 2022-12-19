import { ProductPriceSale } from "modules/Product/ProductPrice";
import { formatMoney } from "utils";

interface OrderPaymentProps {
  totalProductsPrice: number;
  shippingFee: number;
  promotion: number;
  totalPayment: number;
}

const OrderPayment = ({
  totalProductsPrice,
  shippingFee,
  promotion,
  totalPayment
}: OrderPaymentProps) => {
  return (
    <div className="p-4 mt-3 text-right bg-[#fffcf5] rounded-md">
      <div className="flex">
        <div className="flex-1 py-2">Tổng tiền hàng</div>
        <div className="w-1/2 py-2 md:w-48">{formatMoney(totalProductsPrice)}</div>
      </div>
      <div className="flex">
        <div className="flex-1 py-2">Phí vận chuyển</div>
        <div className="w-1/2 py-2 md:w-48">{formatMoney(shippingFee)}</div>
      </div>
      <div className="flex">
        <div className="flex-1 py-2">Voucher từ Shopbee</div>
        <div className="w-1/2 py-2 md:w-48">{formatMoney(promotion * -1)}</div>
      </div>
      <div className="flex">
        <div className="flex-1 py-2">Tổng thanh toán</div>
        <div className="w-1/2 py-2 md:w-48">
          <ProductPriceSale>{totalPayment}</ProductPriceSale>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
