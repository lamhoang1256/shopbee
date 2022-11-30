import { ICart } from "@types";
import { useStore } from "store/globalStore";
import { calcTotalCart } from "utils/helper";
import {
  CartBody,
  CartEmpty,
  CartFooter,
  CartHeader,
  CartItem,
  CartOutOfStock
} from "modules/cart";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
  const { carts, cartsOutOfStock } = useStore((state) => state);
  const total = calcTotalCart(carts, "oldPrice");
  const totalSale = calcTotalCart(carts, "price");
  if (carts?.length === 0 && cartsOutOfStock?.length === 0) return <CartEmpty />;
  return (
    <div className="layout-container">
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <CartHeader />
      {carts.length > 0 && (
        <CartBody>
          {carts.map((cart: ICart) => (
            <CartItem key={cart._id} cartItem={cart} />
          ))}
        </CartBody>
      )}
      {cartsOutOfStock.length > 0 && (
        <CartBody>
          <h3>Danh Sách Sản Phẩm Hết Hàng</h3>
          {cartsOutOfStock?.map((cart: ICart) => (
            <CartOutOfStock key={cart._id} cartItem={cart} />
          ))}
        </CartBody>
      )}
      <CartFooter total={totalSale} totalNotSale={total} count={carts?.length} />
    </div>
  );
};

export default CartPage;
