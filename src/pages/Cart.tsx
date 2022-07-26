import { CartHeader, CartItem } from "modules/cart";

const Cart = () => {
  return (
    <div className='layout-container'>
      <CartHeader />
      <div className='p-2 mt-4 bg-white lg:p-5'>
        <CartItem />
      </div>
    </div>
  );
};

export default Cart;
