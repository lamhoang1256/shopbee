/* eslint-disable @typescript-eslint/naming-convention */
import { path } from "constants/path";
import { IProduct } from "interfaces";
import {
  ProductImage,
  ProductLabelSale,
  ProductPriceSale,
  ProductRating,
  ProductTitle,
} from "modules/product";
import { Link } from "react-router-dom";
import { formatCash, formatMoney } from "utils/helper";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { priceSale, price, image, _id, name, rating, sold } = product;
  const precentSale = Math.ceil((1 - priceSale / price) * 100);
  return (
    <Link to={`${path.product}/${_id}`} className='product-item' key={_id}>
      <ProductImage imageUrl={image} />
      <div className='p-2 pb-4'>
        <ProductTitle>{name}</ProductTitle>
        <div className='flex flex-col my-1 gap-x-2 gap-y-1 md:items-center md:flex-row'>
          <ProductRating rating={rating} size='w-[14px] h-[14px]' />
          <span className='text-[#787878] text-xs'>Đã bán {formatCash(sold)}</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProductPriceSale>{formatMoney(priceSale)}</ProductPriceSale>
          <ProductLabelSale>-{precentSale}%</ProductLabelSale>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
