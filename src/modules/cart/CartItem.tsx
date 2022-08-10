import { cartAPI } from "apis";
import { QuantityController } from "components/quantityController";
import { path } from "constants/path";
import { ICart } from "@types";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { formatMoney } from "utils/helper";

const CartItem = ({ cartInfo }: { cartInfo: ICart }) => {
  const { carts, currentUser, setCart } = useStore((state) => state);

  const handleAddToCart = async (quantity: number) => {
    try {
      const payload = {
        userId: currentUser?._id,
        productId: cartInfo?.product?._id,
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
      userId: currentUser?._id,
      cartIds: cartInfo?._id,
    };
    try {
      const { success, message } = await cartAPI.deleteSingleCart(payload);
      if (success) {
        const updatedCarts = carts.filter((cartItem) => cartItem._id !== cartInfo?._id);
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
      <ProductImage className='w-24 lg:w-20' imageUrl={cartInfo?.product?.image} />
      <div className='flex flex-col flex-1 md:flex-row'>
        <ProductTitle
          styleLink='md:w-[40%]'
          className='line-clamp-2'
          to={`${path.product}/${cartInfo?.product?._id}`}
        >
          {cartInfo?.product?.name}
        </ProductTitle>
        <div className='flex flex-col justify-between flex-1 gap-y-2 md:flex-row'>
          <div className='flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-4 gap-x-2'>
            <ProductPriceOld> {formatMoney(cartInfo?.product?.price)}</ProductPriceOld>
            <ProductPriceSale>{formatMoney(cartInfo?.product?.priceSale)}</ProductPriceSale>
          </div>
          <div className='flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-7 gap-x-2'>
            <QuantityController
              defaultQuantity={cartInfo?.quantity}
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
