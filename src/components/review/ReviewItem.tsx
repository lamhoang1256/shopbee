import { defaultUserAvatar } from "constants/global";
import { ProductRating } from "modules/product";

interface ReviewItemProps {
  avatar: string;
  fullname: string;
  rating: number;
  children: React.ReactNode;
}

const ReviewItem = ({ avatar, fullname, rating, children }: ReviewItemProps) => {
  return (
    <div className='mt-4'>
      <div className='flex items-center gap-x-4'>
        <img
          src={avatar || defaultUserAvatar}
          alt='shop avatar'
          className='w-10 h-10 rounded-full'
        />
        <div>
          <h3 className='text-[15px] font-medium'>{fullname}</h3>
          <ProductRating rating={rating} className='w-4 h-4' />
        </div>
      </div>
      <p className='mt-1'>{children}</p>
    </div>
  );
};

export default ReviewItem;
