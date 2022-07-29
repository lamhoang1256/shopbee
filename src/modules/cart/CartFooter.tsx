import { configAPI } from "apis/configAPI";
import { ButtonAddToCart } from "components/button";
import { ICart } from "interfaces/cart";
import { ProductPriceSale } from "modules/product";
import { useStore } from "store/configStore";
import { formatVNDCurrency } from "utils/helper";

interface CartFooterProps {
  totalPayment: number;
  totalPaymentNotSale: number;
  count: number;
}

const CartFooter = ({ totalPayment, totalPaymentNotSale, count }: CartFooterProps) => {
  const carts = useStore((state: any) => state.cart);
  const currentUser = useStore((state: any) => state.currentUser);
  const handleBuyProduct = async () => {
    const values = carts.map((cart: ICart) => {
      return {
        productId: cart.product._id,
        quantity: cart.quantity,
      };
    });
    try {
      const response = await configAPI.productPayment(currentUser?._id, values);
      console.log("response: ", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row'>
      <div>
        <div>
          Tổng ({count} sản phẩm):
          <ProductPriceSale className='text-xl font-medium'>
            {" "}
            {formatVNDCurrency(totalPayment)}
          </ProductPriceSale>
        </div>
        <div>
          Tiết kiệm:{" "}
          <ProductPriceSale>
            {formatVNDCurrency(totalPaymentNotSale - totalPayment)}
          </ProductPriceSale>
        </div>
      </div>
      <ButtonAddToCart onClick={handleBuyProduct}>Mua hàng</ButtonAddToCart>
    </div>
  );
};

export default CartFooter;
