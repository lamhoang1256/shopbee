import { IconStar } from "components/icons";
import classNames from "utils/classNames";

interface ProductRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
}

const renderRating = (rating: number, className: string) => {
  const scoreRating = Math.ceil(rating);
  return [1, 2, 3, 4, 5].map((score) => {
    if (score <= scoreRating) {
      return <IconStar key={score} className={classNames("text-[#ffce3d]", className)} />;
    }
    return <IconStar key={score} className={classNames("text-[#d5d5d5]", className)} />;
  });
};

const Rating = ({ rating, className = "" }: ProductRatingProps) => {
  return <div className="flex">{renderRating(rating, className)}</div>;
};

export default Rating;
