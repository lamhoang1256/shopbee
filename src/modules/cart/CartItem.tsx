import { CheckBox } from "components/checkbox";
import { QuantityController } from "components/quantityController";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";

const CartItem = () => {
  return (
    <div className='border-[#00000017] border p-4 flex items-center gap-2'>
      <div className='cart-header-grid'>
        <CheckBox className='flex-shrink-0' />
        <ProductImage
          className='w-20 mx-auto'
          imageUrl='https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg'
        />
        <ProductTitle className='text-left max-w-[500px] line-clamp-2'>
          [Mã FADI5K245 giảm 5K đơn 0đ] Áo thun tay lỡ Gấu194 unisex form rộng trơn chữ vải coton
          mềm mịn co dãn 4 chiều - GAU1994
        </ProductTitle>
        <div className='flex flex-col justify-center gap-x-1'>
          <ProductPriceOld>199.999đ</ProductPriceOld>
          <ProductPriceSale>199.999đ</ProductPriceSale>
        </div>
        <QuantityController />
        <span>Xóa</span>
      </div>
    </div>
  );
};

export default CartItem;
