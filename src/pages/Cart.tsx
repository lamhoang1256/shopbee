import { CartFooter, CartHeader, CartItem } from "modules/cart";
import { useStore } from "store/configStore";

const Cart = () => {
  const carts = useStore((state: any) => state.cart);
  return (
    <div className='layout-container'>
      <CartHeader />
      <div className='mt-4 bg-white lg:p-5'>
        {carts.map((cart: any) => (
          <CartItem key={cart._id} />
        ))}
      </div>
      <CartFooter />
    </div>
  );
};

export default Cart;
