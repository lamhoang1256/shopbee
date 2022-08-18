/* eslint-disable @typescript-eslint/naming-convention */
import { IProduct } from "@types";
import { path } from "constants/path";
import { ProductImage, ProductPriceSale, ProductRating, ProductTitle } from "modules/product";
import { Link } from "react-router-dom";
import { formatCash, formatMoney } from "utils/helper";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { price, oldPrice, image, _id, name, rating, sold } = product;
  const precentSale = Math.ceil((1 - price / oldPrice) * 100);
  return (
    <Link to={`${path.product}/${_id}`} className='product-item' key={_id}>
      <ProductImage imageUrl={image} />
      <div className='p-2 pb-4'>
        <ProductTitle>{name}</ProductTitle>
        <div className='flex flex-col my-1 gap-x-2 gap-y-1 md:items-center md:flex-row'>
          <ProductRating rating={rating} className='w-[14px] h-[14px]' />
          <span className='text-[#787878] text-xs'>Đã bán {formatCash(sold)}</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProductPriceSale>{formatMoney(price)}</ProductPriceSale>
          <span className='text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4'>
            -{precentSale}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
