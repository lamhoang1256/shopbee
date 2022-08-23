import { ICart } from "@types";
import { cartAPI } from "apis";
import { QuantityController } from "components/quantityController";
import { path } from "constants/path";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

const CartItem = ({ cartItem }: { cartItem: ICart }) => {
  const { carts, setCart } = useStore((state) => state);
  const handleAddToCart = async (quantity: number) => {
    try {
      const payload = {
        productId: cartItem?.product?._id,
        quantity,
      };
      const { data, success } = await cartAPI.addToCart(payload);
      if (success) {
        const index = carts.findIndex((cart: ICart) => data?._id === cart._id);
        carts[index].quantity = quantity;
        setCart([...carts]);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const handleRemoveCartItem = async () => {
    const payload = {
      cartIds: cartItem?._id,
    };
    try {
      const { success, message } = await cartAPI.deleteSingleCart(payload);
      if (success) {
        const updatedCarts = carts.filter((item) => item._id !== cartItem?._id);
        setCart(updatedCarts);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const onChangeQuantity = (value: number) => {
    handleAddToCart(value);
  };

  return (
    <div className='border-[#00000017] my-3 border p-4 flex items-center gap-3'>
      <ProductImage className='w-24 lg:w-20' imageUrl={cartItem?.product?.image} />
      <div className='flex flex-col flex-1 md:flex-row'>
        <ProductTitle styleLink='md:w-[40%]' to={`${path.product}/${cartItem?.product?._id}`}>
          {cartItem?.product?.name}
        </ProductTitle>
        <div className='flex flex-col justify-between flex-1 gap-y-2 md:flex-row'>
          <div className='flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-4 gap-x-2'>
            <ProductPriceOld>{cartItem?.product?.oldPrice}</ProductPriceOld>
            <ProductPriceSale>{cartItem?.product?.price}</ProductPriceSale>
          </div>
          <div className='flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-7 gap-x-2'>
            <QuantityController
              defaultQuantity={cartItem?.quantity}
              onChangeValue={onChangeQuantity}
            />
            <button type='button' onClick={handleRemoveCartItem}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
