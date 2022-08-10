import { cartAPI, productAPI } from "apis";
import { Button } from "components/button";
import { path } from "constants/path";
import { ICart } from "@types";
import { ProductPriceSale } from "modules/product";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { formatMoney } from "utils/helper";

interface CartFooterProps {
  totalPayment: number;
  totalPaymentNotSale: number;
  count: number;
}

const CartFooter = ({ totalPayment, totalPaymentNotSale, count }: CartFooterProps) => {
  const navigate = useNavigate();
  const { carts, currentUser, setCart } = useStore((state) => state);

  const buyProducts = async (values: any) => {
    try {
      const { data, success, message } = await productAPI.buyProducts(values);
      if (success) {
        toast.success(message);
        setCart([]);
        navigate(`${path.order}/${data?._id}`);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleRemoveAllCart = async () => {
    try {
      const values = {
        userId: currentUser?._id,
      };
      const { success, message } = await cartAPI.deleteAllCart(values);
      if (success) {
        setCart([]);
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleBuyProducts = () => {
    const orderItems = carts.map((cart: ICart) => ({
      name: cart.product.name,
      quantity: cart.quantity,
      image: cart.product.image,
      price: cart.product.price,
      priceSale: cart.product.priceSale,
      product: cart.product._id,
    }));
    const totalPriceProduct = orderItems.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.quantity * currentValue.priceSale;
    }, 0);
    const shippingPrice = 16000;
    const totalDiscount = 10000;
    const values = {
      userId: currentUser._id,
      orderItems,
      shippingAddress: `${currentUser?.addressHome}, ${currentUser?.addressAdministrative}`,
      shippingPrice,
      totalPriceProduct,
      totalDiscount,
      totalPayment: totalPriceProduct + shippingPrice - totalDiscount,
    };
    buyProducts(values);
  };

  return (
    <div className='flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row'>
      <div>
        <div>
          Tổng ({count} sản phẩm):
          <ProductPriceSale className='ml-1 text-xl font-medium'>
            {formatMoney(totalPayment)}
          </ProductPriceSale>
        </div>
        <div>
          Tiết kiệm:
          <ProductPriceSale className='ml-1'>
            {formatMoney(totalPaymentNotSale - totalPayment)}
          </ProductPriceSale>
        </div>
      </div>
      <div className='flex gap-3'>
        <Button onClick={handleRemoveAllCart}>Xóa tất cả</Button>
        <Button primary onClick={handleBuyProducts}>
          Mua hàng
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
