import { userAPI } from "apis";
import { IconHeart } from "components/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

const SaveWishlist = () => {
  const { id = "" } = useParams();
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const indexProductInWishlist = currentUser.wishlist?.indexOf(id);
  const [isAddedWishlist, setIsAddedWishlist] = useState(indexProductInWishlist !== -1);

  const handleAddToWishlist = async () => {
    try {
      const { message, data } = await userAPI.addToWishlist({ productId: id });
      toast.success(message);
      setCurrentUser(data);
      setIsAddedWishlist(true);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const handleRemoveFromWishlist = async () => {
    try {
      const { message, data } = await userAPI.removeFromWishlist({ productId: id });
      toast.success(message);
      setCurrentUser(data);
      setIsAddedWishlist(false);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='flex items-center gap-x-2'>
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
