import { path } from "constants/path";
import { ICart } from "interfaces/cart";
import { CartBody, CartFooter, CartHeader, CartItem } from "modules/cart";
import { Link } from "react-router-dom";
import { useStore } from "store/configStore";
import { calcTotalMoneyCart } from "utils/helper";

const Cart = () => {
  const carts = useStore((state: any) => state.cart);
  const total = calcTotalMoneyCart(carts, "price");
  const totalSale = calcTotalMoneyCart(carts, "priceSale");
  if (carts.length === 0) {
    return (
      <div className='layout-container'>
        <div className='flex flex-col items-center justify-center gap-y-2 h-[400px] '>
          <img
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png'
            alt='cart'
            className='w-28 h-28'
          />
          <h3 className='font-medium text-base text-[#00000066]'>Giỏ hàng của bạn còn trống</h3>
          <Link to={path.home}>
            <button type='button' className='py-2 mt-2 text-white rounded px-9 bg-orangeee4'>
              MUA NGAY
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className='layout-container'>
      <CartHeader />
      <CartBody>
        {carts?.map((cart: ICart) => (
          <CartItem key={cart._id} cartInfo={cart} />
        ))}
      </CartBody>
      <CartFooter totalPayment={totalSale} totalPaymentNotSale={total} count={carts?.length} />
    </div>
  );
};

export default Cart;
