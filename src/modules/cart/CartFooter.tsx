import { ButtonAddToCart } from "components/button";
import { ProductPriceSale } from "modules/product";
import { formatVNDCurrency } from "utils/helper";

interface CartFooterProps {
  totalPayment: number;
  totalPaymentNotSale: number;
  count: number;
}

const CartFooter = ({ totalPayment, totalPaymentNotSale, count }: CartFooterProps) => {
  return (
    <div className='flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row'>
      <div>
        <div>
          Tổng ({count} sản phẩm):
          <ProductPriceSale className='text-xl font-medium'>
            {" "}
            {formatVNDCurrency(totalPayment)}
          </ProductPriceSale>
        </div>
        <div>
          Tiết kiệm:{" "}
          <ProductPriceSale>
            {formatVNDCurrency(totalPaymentNotSale - totalPayment)}
          </ProductPriceSale>
        </div>
      </div>
      <ButtonAddToCart>Mua hàng</ButtonAddToCart>
    </div>
  );
};

export default CartFooter;
