import { IconStar } from "components/icons";
import classNames from "utils/className";

const renderStarRating = (score: number) => {
  return [1, 2, 3, 4, 5].map((item) => {
    if (item <= score) {
      return <IconStar key={item} className={classNames("text-[#ffce3d] w-5 h-5")} />;
    }
    return <IconStar key={item} className={classNames("text-[#d5d5d5] w-5 h-5")} />;
  });
};

export const SearchByRating = () => {
  return (
    <>
      {[5, 4, 3, 2, 1].map((number) => {
        if (number === 5) {
          return (
            <div className='flex mt-2' key={number}>
              {renderStarRating(number)}
            </div>
          );
        }
        return (
          <div className='flex mt-2' key={number}>
            {renderStarRating(number)}
            <span className='text-[#000000cc] ml-2'>Trở lên</span>
          </div>
        );
      })}
    </>
  );
};
