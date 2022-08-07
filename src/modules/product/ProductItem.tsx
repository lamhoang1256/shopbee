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
  return (
    <Link
      to={product._id}
      className='transition duration-300 border bg-white shadow-product hover:-translate-y-[2px] border-transparent hover:border-orangeee4'
      key={product._id}
    >
      <div className='p-2'>
        <ProductImage imageUrl={product.image} />
      </div>
      <div className='p-[6px] pb-3'>
        <ProductTitle>{product.name}</ProductTitle>
        <div className='flex flex-col my-1 gap-x-2 gap-y-1 md:items-center md:flex-row'>
          <ProductRating rating={product.rating} size='w-[14px] h-[14px]' />
          <span className='text-[#787878] text-xs'>Đã bán {formatCash(product.sold)}</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProductPriceSale>{formatMoney(product.priceSale)}</ProductPriceSale>
          <ProductLabelSale>
            -{Math.ceil((1 - product.priceSale / product.price) * 100)}%
          </ProductLabelSale>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
