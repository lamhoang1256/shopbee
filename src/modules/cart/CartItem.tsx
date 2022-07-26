import { CheckBox } from "components/checkbox";
import { QualityController } from "components/qualityController";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";

const CartItem = () => {
  return (
    <div className='border-[#00000017] border p-4'>
      <div className='flex items-center justify-between overflow-auto text-sm text-center gap-x-6 cart-scrollbar'>
        <div className='w-12'>
          <CheckBox />
        </div>
        <div className='text-sm w-[450px] flex items-center flex-shrink-0 gap-x-3'>
          <ProductImage
            className='w-20'
            imageUrl='https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg'
          />
          <ProductTitle>
            [Mã FADI5K245 giảm 5K đơn 0đ] Áo thun tay lỡ Gấu194 unisex form rộng trơn chữ vải coton
            mềm mịn co dãn 4 chiều - GAU1994
          </ProductTitle>
        </div>
        <div className='w-[170px] flex gap-x-2 justify-center'>
          <ProductPriceOld>199.999đ</ProductPriceOld>
          <ProductPriceOld>199.999đ</ProductPriceOld>
        </div>
        <div className='w-[175px] flex justify-center'>
          <QualityController />
        </div>
        <div className='w-[115px]'>
          <ProductPriceSale>199.999đ</ProductPriceSale>
        </div>
        <span className='w-[115px]'>Xóa</span>
      </div>
    </div>
  );
};

export default CartItem;
