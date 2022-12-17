import { Link } from "react-router-dom";
import { IconStar } from "components/Icons";
import { PATH } from "constants/path";
import classNames from "utils/classNames";

const renderStarRating = (score: number) => {
  return [1, 2, 3, 4, 5].map((num) => {
    if (num <= score) {
      return <IconStar key={num} className={classNames("text-[#ffce3d] w-5 h-5")} />;
    }
    return <IconStar key={num} className={classNames("text-[#d5d5d5] w-5 h-5")} />;
  });
};

const SearchByRating = () => {
  return (
    <>
      <div className="mt-6 search-category">
        <IconStar />
        <span>Đánh giá</span>
      </div>
      <div className="mt-3">
        {[5, 4, 3, 2, 1].map((num) => {
          if (num === 5) {
            return (
              <Link to={`${PATH.search}?rating=${num}`} className="flex mt-2" key={num}>
                {renderStarRating(num)}
              </Link>
            );
          }
          return (
            <Link to={`${PATH.search}?rating=${num}`} className="flex mt-2" key={num}>
              {renderStarRating(num)}
              <span className="text-[#000000cc] ml-2">Trở lên</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SearchByRating;
