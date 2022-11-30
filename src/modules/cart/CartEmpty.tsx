import { Button } from "components/button";
import { PATH } from "constants/path";

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-1 h-[400px]">
      <img src="/images/cart-empty.png" alt="empty cart" className="w-28 h-28" />
      <h3 className="font-medium text-base text-[#00000066]">Giỏ hàng của bạn còn trống</h3>
      <Button to={PATH.search} primary className="py-2 mt-2 text-white rounded px-9">
        MUA NGAY
      </Button>
    </div>
  );
};

export default CartEmpty;
