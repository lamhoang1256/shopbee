import { Rating } from "components/_rating";
import { ProductSaveWishlist } from "modules/_product";

interface ProductMetaProps {
  rating: number;
  sold: number;
}

const ProductMeta = ({ rating, sold }: ProductMetaProps) => {
  return (
    <div className="flex flex-wrap items-center my-4 gap-x-4 gap-y-2">
      <span className="font-medium">{rating}</span>
      <span className="pr-4 border-r">
        <Rating rating={rating} />
      </span>
      <div className="pr-4 border-r border-[#00000024]">
        <span>{sold}</span>
        <span className="pl-3 text-[#767676] text-sm">Đã bán</span>
      </div>
      <ProductSaveWishlist />
    </div>
  );
};

export default ProductMeta;
