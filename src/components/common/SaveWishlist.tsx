import { userAPI } from "apis";
import { IconHeart } from "components/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

interface SaveWishlistProps {
  productId: string;
}

const SaveWishlist = ({ productId }: SaveWishlistProps) => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const indexProductInWishlist = currentUser.wishlist?.indexOf(productId);
  const [isAddedWishlist, setIsAddedWishlist] = useState(indexProductInWishlist !== -1);

  const handleAddToWishlist = async () => {
    try {
      const { message, data } = await userAPI.addToWishlist({ productId });
      toast.success(message);
      setCurrentUser(data);
      setIsAddedWishlist(true);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const handleRemoveFromWishlist = async () => {
    try {
      const { message, data } = await userAPI.removeFromWishlist({ productId });
      toast.success(message);
      setCurrentUser(data);
      setIsAddedWishlist(false);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='flex items-center my-3 gap-x-2'>
      {isAddedWishlist ? (
        <button type='button' onClick={handleRemoveFromWishlist}>
          <IconHeart active />
        </button>
      ) : (
        <button type='button' onClick={handleAddToWishlist}>
          <IconHeart active={false} />
        </button>
      )}
      <span className='text-base'>Đã thích</span>
    </div>
  );
};

export default SaveWishlist;
