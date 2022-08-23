import { IProduct } from "@types";
import { Rating } from "components/rating";
import { path } from "constants/path";
import { ProductImage, ProductPriceSale, ProductTitle } from "modules/product";
import { Link } from "react-router-dom";
import { formatCash } from "utils/helper";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const precentSale = Math.ceil((1 - product.price / product.oldPrice) * 100);
  return (
    <Link
      key={product._id}
      to={`${path.product}/${product._id}`}
      className='transition-all rounded overflow-hidden duration-300 border bg-white shadow-product hover:-translate-y-[3px] border-transparent hover:shadow-product-hover'
    >
      <ProductImage imageUrl={product.image} />
      <div className='p-2 pb-4'>
        <ProductTitle>{product.name}</ProductTitle>
        <div className='flex flex-col my-1 gap-x-2 gap-y-1 md:items-center md:flex-row'>
          <Rating rating={product.rating} className='w-[14px] h-[14px]' />
          <span className='text-[#787878] text-xs'>Đã bán {formatCash(product.sold)}</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProductPriceSale>{product.price}</ProductPriceSale>
          <span className='text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4'>
            -{precentSale}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
