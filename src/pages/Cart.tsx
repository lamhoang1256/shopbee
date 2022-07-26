import { CartHeader, CartItem } from "modules/cart";

const Cart = () => {
  return (
    <div className='layout-container'>
      <CartHeader />
      <div className='px-5 py-5 mt-4 bg-white'>
        <CartItem />
      </div>
    </div>
  );
};

export default Cart;
