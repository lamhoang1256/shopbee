import { path } from "constants/path";
import { IProduct } from "interfaces";
import {
  ProductImage,
  ProductPriceSale,
  ProductRating,
  ProductTitle,
  ProductLabelSale,
} from "modules/product";
import { Link } from "react-router-dom";
import { formatCash, formatVNDCurrency } from "utils/helper";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link
      to={`${path.detail}/${product._id}`}
      className='bg-white shadow-product'
      key={product._id}
    >
      <ProductImage imageUrl={product.image} />
      <div className='p-[6px]'>
        <ProductTitle>{product.name}</ProductTitle>
        <div className='flex items-center my-1 gap-x-2'>
          <ProductRating rating={product.rating} size='w-[14px] h-[14px]' />
          <span className='text-[#787878] text-xs'>Đã bán {formatCash(product.sold)}</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProductPriceSale>{formatVNDCurrency(product.priceSale)}</ProductPriceSale>
          <ProductLabelSale>
            -{Math.ceil((1 - product.priceSale / product.price) * 100)}%
          </ProductLabelSale>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
