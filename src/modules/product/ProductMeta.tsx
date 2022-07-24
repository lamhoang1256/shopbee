import { IconStar } from "components/icons";
import { formatCash } from "utils/helper";

interface ProductMetaProps {
  sold: number;
  rating: number;
}

const renderRating = (rating: number) => {
  const scoreRating = Math.ceil(rating);
  return [1, 2, 3, 4, 5].map((item) => {
    if (item <= scoreRating) {
      return <IconStar key={item} className='text-[#ffce3d] w-3 h-3' />;
    }
    return <IconStar key={item} className='text-[#d5d5d5] w-3 h-3' />;
  });
};

const ProductMeta = ({ sold, rating }: ProductMetaProps) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='flex items-center justify-between'>{renderRating(rating)}</span>
      <span className='text-[#000000de] text-xs'>{formatCash(Number(sold))} Đã bán</span>
    </div>
  );
};

export default ProductMeta;
