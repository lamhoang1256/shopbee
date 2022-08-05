import { configAPI } from "apis/configAPI";
import { QuantityController } from "components/quantityController";
import { path } from "constants/path";
import { ICart } from "interfaces";
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
      const { data, success } = await configAPI.addToCart(payload);
      if (success) {
        const index = carts.findIndex((cart: ICart) => data?._id === cart._id);
        carts[index].quantity = quantity;
        setCart([...carts]);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const onChangeQuantity = (value: number) => {
    handleAddToCart(value);
  };

  const handleRemoveCartItem = async () => {
    const payload = {
      userId: currentUser?._id,
      cartIds: cartInfo?._id,
    };
    try {
      const { success, message } = await configAPI.deleteSingleCart(payload);
      if (success) {
        const updatedCarts = carts.filter((cartItem) => cartItem._id !== cartInfo?._id);
        setCart(updatedCarts);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='border-[#00000017] my-3 border p-4 flex items-center gap-2'>
      <div className='cart-grid'>
        <ProductImage className='w-20 mx-auto' imageUrl={cartInfo?.product?.image} />
        <div className=' cart-grid-2'>
          <ProductTitle
            className='text-left max-w-[500px] line-clamp-3 lg:line-clamp-2'
            to={`${path.product}/${cartInfo?.product?._id}`}
          >
            {cartInfo?.product?.name}
          </ProductTitle>
        </div>
        <div className='flex flex-col justify-center gap-x-1'>
          <ProductPriceOld> {formatMoney(cartInfo?.product?.price)}</ProductPriceOld>
          <ProductPriceSale>{formatMoney(cartInfo?.product?.priceSale)}</ProductPriceSale>
        </div>
        <QuantityController
          defaultQuantity={cartInfo?.quantity}
          onChangeValue={onChangeQuantity}
          className='mx-auto'
        />
        <button type='button' onClick={handleRemoveCartItem}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
