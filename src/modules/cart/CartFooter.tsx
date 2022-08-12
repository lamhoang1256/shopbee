import { toast } from "react-toastify";
import { cartAPI } from "apis";
import { path } from "constants/path";
import { formatMoney } from "utils/helper";
import { useStore } from "store/configStore";
import { Button } from "components/button";
import { ProductPriceSale } from "modules/product";

interface CartFooterProps {
  totalPayment: number;
  totalPaymentNotSale: number;
  count: number;
}

const CartFooter = ({ totalPayment, totalPaymentNotSale, count }: CartFooterProps) => {
  const { setCart } = useStore((state) => state);
  const handleRemoveAllCart = async () => {
    try {
      const { success, message } = await cartAPI.deleteAllCart();
      if (success) {
        setCart([]);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row'>
      <div>
        <div>
          Tổng ({count} sản phẩm):
          <ProductPriceSale className='ml-1 text-xl font-medium'>
            {formatMoney(totalPayment)}
          </ProductPriceSale>
        </div>
        <div>
          Tiết kiệm:
          <ProductPriceSale className='ml-1'>
            {formatMoney(totalPaymentNotSale - totalPayment)}
          </ProductPriceSale>
        </div>
      </div>
      <div className='flex gap-3'>
        <Button onClick={handleRemoveAllCart}>Xóa tất cả</Button>
        <Button primary to={path.payment}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
