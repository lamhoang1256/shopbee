import { ButtonAddToCart } from "components/button";
import { CheckBox } from "components/checkbox";
import { ProductPriceSale } from "modules/product";

const CartFooter = () => {
  return (
    <div className='flex flex-col justify-between py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row px-9'>
      <div className='flex gap-x-5'>
        <CheckBox />
        <span>Chọn tất cả (1)</span>
        <span>Xóa</span>
      </div>
      <div className='flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
        <div>
          <p>
            Tổng (0 sản phẩm):
            <ProductPriceSale className='text-xl font-medium'> 0</ProductPriceSale>
          </p>
          <span>
            Tiết kiệm: <ProductPriceSale>10</ProductPriceSale>{" "}
          </span>
        </div>
        <ButtonAddToCart>Mua hàng</ButtonAddToCart>
      </div>
    </div>
  );
};

export default CartFooter;
