import { Rating } from "components/rating";
import { defaultUserAvatar } from "constants/global";
import { formatDateVNFull } from "utils/helper";

interface ReviewItemProps {
  avatar: string;
  fullname: string;
  rating: number;
  createdAt: string;
  children: React.ReactNode;
}

const ReviewItem = ({ avatar, fullname, rating, children, createdAt }: ReviewItemProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-x-4">
        <img
          src={avatar || defaultUserAvatar}
          alt="shop avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="text-[15px] font-medium">{fullname}</h3>
          <Rating rating={rating} className="w-4 h-4" />
        </div>
      </div>
      <span className="text-[rgba(0,0,0,.54)] block mt-1 md:ml-14">
        {formatDateVNFull(createdAt)}
      </span>
      <p className="mt-1 md:ml-14">{children}</p>
    </div>
  );
};

export default ReviewItem;
