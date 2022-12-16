import { cartAPI } from "apis";
import Button from "components/Button";
import { PATH } from "constants/path";
import { ProductPriceSale } from "modules/Product/ProductPrice";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

interface CartFooterProps {
  total: number;
  totalNotSale: number;
  count: number;
}

const CartFooter = ({ total, totalNotSale, count }: CartFooterProps) => {
  const { setCarts } = useStore((state) => state);
  const handleRemoveAllCart = async () => {
    try {
      const { message } = await cartAPI.deleteAllCart();
      setCarts([]);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row">
      <div>
        <div>
          Tổng ({count} sản phẩm):
          <ProductPriceSale className="ml-1 text-xl font-medium">{total}</ProductPriceSale>
        </div>
        <div>
          Tiết kiệm:
          <ProductPriceSale className="ml-1">{totalNotSale - total}</ProductPriceSale>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleRemoveAllCart}>Xóa tất cả</Button>
        <Button primary to={PATH.checkout}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
