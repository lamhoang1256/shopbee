import { IProduct } from "interfaces";
import {
  ProductPriceOld,
  ProductPriceSale,
  ProductRating,
  ProductTitle,
  ProductImage,
} from "modules/product";
import { formatVNDCurrency } from "utils/helper";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className='bg-white shadow-product' key={product._id}>
      <ProductImage imageUrl={product.image} />
      <div className='p-[6px]'>
        <ProductTitle>{product.name}</ProductTitle>
        <div className='flex items-baseline my-1 gap-x-2'>
          <ProductPriceOld className='text-[13px]'>
            {formatVNDCurrency(product.price)}
          </ProductPriceOld>
          <ProductPriceSale>{formatVNDCurrency(product.priceSale)}</ProductPriceSale>
        </div>
        <div className='flex items-center justify-between'>
          <ProductRating rating={product.rating} size='w-3 h-3' />
          <span className='text-[#000000de] text-xs'>{product.sold} Đã bán</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
