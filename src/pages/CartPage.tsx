import { ICart } from "interfaces";
import { CartBody, CartEmpty, CartFooter, CartHeader, CartItem } from "modules/cart";
import { useStore } from "store/configStore";
import { calcTotalMoneyCart } from "utils/helper";

const CartPage = () => {
  const { carts } = useStore((state) => state);
  const total = calcTotalMoneyCart(carts, "price");
  const totalSale = calcTotalMoneyCart(carts, "priceSale");
  if (carts?.length === 0) return <CartEmpty />;
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

export default CartPage;
