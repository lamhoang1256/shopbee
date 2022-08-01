import { configAPI } from "apis/configAPI";
import { QuantityController } from "components/quantityController";
import { ICart } from "interfaces/cart";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { formatMoney } from "utils/helper";

const CartItem = ({ cartInfo }: { cartInfo: ICart }) => {
  const { carts, currentUser, updateCart } = useStore((state: any) => ({
    carts: state.cart,
    currentUser: state.currentUser,
    updateCart: state.updateCart,
  }));

  const onChangeQuantity = (value: number) => {
    const values = {
      userId: currentUser?._id,
      productId: cartInfo?.product?._id,
      quantity: value,
    };
    const addToCart = async () => {
      try {
        const response: any = await configAPI.addToCart(values);
        if (response?.success) {
          const index = carts.findIndex((item: any) => response.purchase._id === item._id);
          carts[index].quantity = response.purchase.quantity;
          updateCart([...carts]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    addToCart();
  };

  const handleRemoveCartItem = async () => {
    try {
      const values = {
        userId: currentUser?._id,
        cartIds: cartInfo?._id,
      };
      const response: any = await configAPI.deleteSingleCart(values);
      if (response.success) toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='border-[#00000017] my-3 border p-4 flex items-center gap-2'>
      <div className='cart-header-grid'>
        <ProductImage className='w-20 mx-auto' imageUrl={cartInfo?.product?.image} />
        <ProductTitle className='text-left max-w-[500px] line-clamp-2' to={cartInfo?.product?._id}>
          {cartInfo?.product?.name}
        </ProductTitle>
        <div className='flex flex-col justify-center gap-x-1'>
          <ProductPriceOld> {formatMoney(cartInfo?.product?.price)}</ProductPriceOld>
          <ProductPriceSale>{formatMoney(cartInfo?.product?.priceSale)}</ProductPriceSale>
        </div>
        <QuantityController defaultQuantity={cartInfo?.quantity} onChangeValue={onChangeQuantity} />
        <button type='button' onClick={handleRemoveCartItem}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;