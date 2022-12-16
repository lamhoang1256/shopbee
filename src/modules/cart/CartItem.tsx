import { ICart } from "@types";
import { cartAPI } from "apis";
import { QuantityController } from "components/QuantityController";
import { PATH } from "constants/path";
import { ProductPriceOld, ProductPriceSale } from "modules/Product/ProductPrice";
import { ProductImage, ProductTitle } from "modules/_product";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

const CartItem = ({ cartItem }: { cartItem: ICart }) => {
  const { carts, setCarts } = useStore((state) => state);
  const handleAddToCart = async (quantity: number) => {
    try {
      const payload = { productId: cartItem.product._id, quantity };
      const { data } = await cartAPI.addToCart(payload);
      const indexNewItem = carts.findIndex((cart: ICart) => data._id === cart._id);
      carts[indexNewItem].quantity = quantity;
      setCarts([...carts]);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleRemoveCartItem = async () => {
    try {
      const { message } = await cartAPI.deleteSingleCart(cartItem._id);
      const newCarts = carts.filter((item) => item._id !== cartItem._id);
      setCarts(newCarts);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const onChangeQuantity = (value: number) => handleAddToCart(value);

  return (
    <div className="border-[#00000017] my-3 border p-4 flex items-center gap-3">
      <ProductImage className="w-24 lg:w-20" src={cartItem.product.image} />
      <div className="flex flex-col flex-1 md:flex-row">
        <ProductTitle styleLink="md:w-[40%]" to={`${PATH.product}/${cartItem.product._id}`}>
          {cartItem.product.name}
        </ProductTitle>
        <div className="flex flex-col justify-between flex-1 gap-y-2 md:flex-row">
          <div className="flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-4 gap-x-2">
            <ProductPriceOld>{cartItem.product.oldPrice}</ProductPriceOld>
            <ProductPriceSale>{cartItem.product.price}</ProductPriceSale>
          </div>
          <div className="flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-7 gap-x-2">
            {cartItem.product.stock ? (
              <QuantityController
                className="quantity-cart-item"
                defaultQuantity={cartItem.quantity}
                onChangeValue={onChangeQuantity}
              />
            ) : (
              <span className="text-base text-redff4">Hết hàng</span>
            )}
            <button type="button" onClick={handleRemoveCartItem}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
