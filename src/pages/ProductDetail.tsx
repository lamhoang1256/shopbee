import { ButtonAddToCart } from "components/button";
import { SectionGray } from "components/common";
import { QualityController } from "components/qualityController";
import {
  ProductImage,
  ProductLabelSale,
  ProductPriceOld,
  ProductPriceSale,
  ProductRating,
  ProductSold,
  ProductTitle,
} from "modules/product";

const ProductDetail = () => {
  return (
    <>
      <div className='flex p-4 mt-6 bg-white layout-container gap-x-5'>
        <div className='flex-shrink-0 w-[400px]'>
          <ProductImage imageUrl='https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg' />
        </div>
        <div>
          <ProductTitle className='text-xl font-medium'>
            [Mã FADI5K245 giảm 5K đơn 0đ] Áo thun tay lỡ Gấu194 unisex form rộng trơn chữ vải coton
            mềm mịn co dãn 4 chiều - GAU1994
          </ProductTitle>
          <div className='flex items-center my-4 gap-x-4'>
            <span className='border-b text-orangeee border-orangeee'>4.9</span>
            <ProductRating rating={4} />
            <ProductSold className='pl-4 border-l border-[#00000024]'>5.66k</ProductSold>
          </div>
          <SectionGray className='flex items-center gap-x-3'>
            <ProductPriceOld className='text-[#929292]'>138.000đ</ProductPriceOld>
            <ProductPriceSale className='text-3xl font-medium'>69.000đ</ProductPriceSale>
            <ProductLabelSale>50% GIẢM</ProductLabelSale>
          </SectionGray>
          <div className='flex items-center mt-6 gap-x-4'>
            <span>Số lượng</span>
            <QualityController />
            <span>1011 sản phẩm có sẵn</span>
          </div>
          <ButtonAddToCart />
        </div>
      </div>
      <div className='p-4 mt-6 bg-white layout-container'>
        <SectionGray>MÔ TẢ SẢN PHẨM</SectionGray>
        <p className='mt-3 text-sm'>
          Áo thun tay lỡ Men 194 unisex form rộng in chữ vải coton mềm mịn co dãn 4 chiều - NO!! CAM
          KẾT HÌNH THIẾT KẾ KHÔNG GIỐNG HÌNH HOÀN TIỀN 100%
        </p>
      </div>
    </>
  );
};

export default ProductDetail;
