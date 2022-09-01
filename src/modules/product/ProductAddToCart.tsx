import { cartAPI } from "apis";
import { ButtonOutline } from "components/button";
import { IconCartOutline } from "components/icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

interface ProductAddToCartProps {
  stock: number;
  quantityAdd: number;
}

const ProductAddToCart = ({ quantityAdd, stock }: ProductAddToCartProps) => {
  const { id = "" } = useParams();
  const { setCart, carts } = useStore((state) => state);
  const handleAddToCart = async () => {
    if (quantityAdd < 1) return;
    let quantity = quantityAdd;
    const cartExist = carts?.find((cart) => cart.product._id === id);
    if (cartExist) {
      quantity = cartExist.quantity + quantityAdd;
      cartExist.quantity = quantity;
    }
    try {
      const { message, data } = await cartAPI.addToCart({ productId: id, quantity });
      if (cartExist) {
        const cartsRemoveExist = carts?.filter((cart) => cart?._id !== cartExist?._id);
        setCart([...cartsRemoveExist, cartExist]);
      } else setCart([...carts, data]);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  if (stock === 0) {
    return <span className='block mt-4 text-lg text-redff4'>Sản phẩm đã hết hàng</span>;
  }
  return (
    <div className='flex flex-col gap-2 mt-6 md:flex-row md:items-center'>
      <ButtonOutline primary className='flex items-center h-10 lg:h-12' onClick={handleAddToCart}>
        <IconCartOutline className='w-4 h-4 mr-2' />
        <span className='text-sm'>Thêm vào giỏ hàng</span>
      </ButtonOutline>
    </div>
  );
};

export default ProductAddToCart;
