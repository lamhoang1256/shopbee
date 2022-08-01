import { configAPI } from "apis/configAPI";
import { ButtonAddToCart } from "components/button";
import { ICart } from "interfaces/cart";
import { ProductPriceSale } from "modules/product";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { formatMoney } from "utils/helper";

interface CartFooterProps {
  totalPayment: number;
  totalPaymentNotSale: number;
  count: number;
}

const CartFooter = ({ totalPayment, totalPaymentNotSale, count }: CartFooterProps) => {
  const carts = useStore((state: any) => state.cart);
  const currentUser = useStore((state: any) => state.currentUser);

  const buyProducts = async (values: any) => {
    try {
      const response: any = await configAPI.buyProducts(values);
      if (response.success) toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllCart = async () => {
    try {
      const values = {
        userId: currentUser?._id,
      };
      const response: any = await configAPI.deleteAllCart(values);
      if (response.success) toast.success(response.message);
    } catch (error) {
      console.log(error);
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
    const values = {
      orderItems,
      shippingAddress:
        "257/80/24, tổ 16, ấp 2 , (gần tạp hóa Phúc Trâm), Xã Đông Thạnh, Huyện Hóc Môn, TP. Hồ Chí Minh",
      shippingPrice: 14000,
      totalPriceProduct: 15000000,
      totalDiscount: 10000,
      userId: currentUser._id,
    };
    buyProducts(values);
  };

  return (
    <div className='flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row'>
      <div>
        <div>
          Tổng ({count} sản phẩm):
          <ProductPriceSale className='text-xl font-medium'>
            {" "}
            {formatMoney(totalPayment)}
          </ProductPriceSale>
        </div>
        <div>
          Tiết kiệm:{" "}
          <ProductPriceSale>{formatMoney(totalPaymentNotSale - totalPayment)}</ProductPriceSale>
        </div>
      </div>
      <div className='flex gap-3'>
        <button
          type='button'
          onClick={handleRemoveAllCart}
          className='py-2 px-4 border border-[#00000017]'
        >
          Xóa tất cả
        </button>
        <ButtonAddToCart onClick={handleBuyProducts}>Mua hàng</ButtonAddToCart>
      </div>
    </div>
  );
};

export default CartFooter;