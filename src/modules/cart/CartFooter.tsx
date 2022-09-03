import { cartAPI } from "apis";
import { Button } from "components/button";
import { PATH } from "constants/path";
import { PriceSale } from "components/price";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

interface CartFooterProps {
  total: number;
  totalNotSale: number;
  count: number;
}

const CartFooter = ({ total, totalNotSale, count }: CartFooterProps) => {
  const { setCart } = useStore((state) => state);
  const handleRemoveAllCart = async () => {
    try {
      const { message } = await cartAPI.deleteAllCart();
      setCart([]);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row'>
      <div>
        <div>
          Tổng ({count} sản phẩm):
          <PriceSale className='ml-1 text-xl font-medium'>{total}</PriceSale>
        </div>
        <div>
          Tiết kiệm:
          <PriceSale className='ml-1'>{totalNotSale - total}</PriceSale>
        </div>
      </div>
      <div className='flex gap-3'>
        <Button onClick={handleRemoveAllCart}>Xóa tất cả</Button>
        <Button primary to={PATH.checkout}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
