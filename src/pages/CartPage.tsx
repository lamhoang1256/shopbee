import { ICart } from "@types";
import { useStore } from "store/configStore";
import { calcTotalMoneyCart } from "utils/helper";
import { CartBody, CartEmpty, CartFooter, CartHeader, CartItem } from "modules/cart";

const CartPage = () => {
  const { carts } = useStore((state) => state);
  const total = calcTotalMoneyCart(carts, "oldPrice");
  const totalSale = calcTotalMoneyCart(carts, "price");
  if (carts?.length === 0) return <CartEmpty />;
  return (
    <div className='layout-container'>
      <CartHeader />
      <CartBody>
        {carts?.map((cart: ICart) => (
          <CartItem key={cart._id} cartItem={cart} />
        ))}
      </CartBody>
      <CartFooter total={totalSale} totalNotSale={total} count={carts?.length} />
    </div>
  );
};

export default CartPage;
