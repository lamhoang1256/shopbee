import { ICart } from "interfaces/cart";
import { CartBody, CartFooter, CartHeader, CartItem } from "modules/cart";
import { useStore } from "store/configStore";
import { calcTotalMoneyCart } from "utils/helper";

const Cart = () => {
  const carts = useStore((state: any) => state.cart);
  const total = calcTotalMoneyCart(carts, "price");
  const totalSale = calcTotalMoneyCart(carts, "priceSale");
  return (
    <div className='layout-container'>
      <CartHeader />
      <CartBody>
        {carts?.map((cart: ICart) => {
          return <CartItem key={cart._id} cartInfo={cart} />;
        })}
      </CartBody>
      <CartFooter totalPayment={totalSale} totalPaymentNotSale={total} count={carts?.length} />
    </div>
  );
};

export default Cart;
