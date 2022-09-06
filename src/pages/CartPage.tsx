import { ICart } from "@types";
import { useStore } from "store/globalStore";
import { calcTotalCart } from "utils/helper";
import { CartBody, CartEmpty, CartFooter, CartHeader, CartItem } from "modules/cart";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
  const { carts } = useStore((state) => state);
  const total = calcTotalCart(carts, "oldPrice");
  const totalSale = calcTotalCart(carts, "price");
  if (carts?.length === 0) return <CartEmpty />;
  return (
    <div className='layout-container'>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
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
