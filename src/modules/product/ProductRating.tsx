import { IconStar } from "components/icons";
import classNames from "utils/className";

interface ProductRatingProps {
  rating: number;
  size?: string;
}

const renderRating = (rating: number, size: string) => {
  const scoreRating = Math.ceil(rating);
  return [1, 2, 3, 4, 5].map((item) => {
    if (item <= scoreRating) {
      return <IconStar key={item} className={classNames("text-[#ffce3d]", size)} />;
    }
    return <IconStar key={item} className={classNames("text-[#d5d5d5]", size)} />;
  });
};

const ProductRating = ({ rating, size = "" }: ProductRatingProps) => {
  return <div className='flex'>{renderRating(rating, size)}</div>;
};

ProductRating.defaultProps = {
  size: "",
};

export default ProductRating;
