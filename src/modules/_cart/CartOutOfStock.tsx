import { ICart } from "@types";
import { cartAPI } from "apis";
import { PATH } from "constants/path";
import { ProductPriceOld, ProductPriceSale } from "modules/Product/ProductPrice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

const CartOutOfStock = ({ cartItem }: { cartItem: ICart }) => {
  const { cartsOutOfStock, setCartsOutOfStock } = useStore((state) => state);
  const handleRemoveCartItem = async () => {
    try {
      const { message } = await cartAPI.deleteSingleCart(cartItem._id);
      const newCarts = cartsOutOfStock.filter((item) => item._id !== cartItem._id);
      setCartsOutOfStock(newCarts);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="border-black017 my-3 border p-4 flex items-center gap-3 opacity-60">
      <img alt={cartItem.product.name} className="w-24 lg:w-20" src={cartItem.product.image} />
      <div className="flex flex-col flex-1 md:flex-row">
        <Link className="md:w-[40%]" to={`${PATH.product}/${cartItem.product._id}`}>
          <h3>{cartItem.product.name}</h3>
        </Link>
        <div className="flex flex-col justify-between flex-1 gap-y-2 md:flex-row">
          <div className="flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-4 gap-x-2">
            <ProductPriceOld>{cartItem.product.oldPrice}</ProductPriceOld>
            <ProductPriceSale>{cartItem.product.price}</ProductPriceSale>
          </div>
          <div className="flex flex-wrap items-center flex-1 text-sm opacity-100 md:justify-center md:gap-x-7 gap-x-2">
            <span className="text-redff4">Còn 0 sản phẩm</span>
            <button type="button" onClick={handleRemoveCartItem}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOutOfStock;
