import { IProduct } from "@types";
import { PATH } from "constants/path";
import Image from "components/Image";
import ProductPriceSale from "modules/Product/ProductPriceSale";
import ProductRating from "modules/Product/ProductRating";
import { Link } from "react-router-dom";
import { formatCash, slugify } from "utils/helper";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const precentPriceSale = Math.ceil((1 - product.price / product.oldPrice) * 100);
  return (
    <Link
      key={product._id}
      to={`${PATH.product}/${product._id}`}
      className="transition-all rounded overflow-hidden duration-300 border bg-white hover:-translate-y-[3px] border-transparent product-card"
    >
      <Image
        src={product.image}
        alt={slugify(product.name)}
        placeholderSrc="/card-loading.png"
        className="aspect-square max-w-full bg-[#fafafa] w-[500px] h-auto"
      />
      <div className="p-2 pb-4">
        <h3 className="product-title">{product.name}</h3>
        <div className="flex flex-col my-1 gap-x-2 gap-y-1 md:items-center md:flex-row">
          <ProductRating rating={product.rating} className="!w-[14px] !h-[14px]" />
          <span className="text-[#787878] text-xs">Đã bán {formatCash(product.sold)}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <ProductPriceSale>{product.price}</ProductPriceSale>
          <span className="text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4">
            -{precentPriceSale}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
