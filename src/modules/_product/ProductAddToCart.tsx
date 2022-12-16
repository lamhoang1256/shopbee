import { cartAPI } from "apis";
import { ButtonOutline } from "components/_button";
import { IconCartOutline } from "components/_icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

interface ProductAddToCartProps {
  stock: number;
  quantityAdd: number;
}

const ProductAddToCart = ({ quantityAdd, stock }: ProductAddToCartProps) => {
  const { id = "" } = useParams();
  const { setCarts, carts, currentUser } = useStore((state) => state);

  const handleAddToCart = async () => {
    if (quantityAdd < 1) return;
    if (!currentUser?._id) {
      toast.error("Vui lòng đăng nhập để thêm giỏ hàng!");
      return;
    }
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
        setCarts([...cartsRemoveExist, cartExist]);
      } else setCarts([...carts, data]);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  if (stock <= 0) {
    return <span className="block mt-4 text-lg text-redff4">Sản phẩm đã hết hàng</span>;
  }
  return (
    <div className="flex flex-col gap-2 mt-6 md:flex-row md:items-center">
      <ButtonOutline
        primary
        className="flex items-center h-10 w-max lg:h-12"
        onClick={handleAddToCart}
      >
        <IconCartOutline className="w-4 h-4 mr-2" />
        <span className="text-sm">Thêm vào giỏ hàng</span>
      </ButtonOutline>
    </div>
  );
};

export default ProductAddToCart;
