import { IProduct } from "@types";
import { wishlistAPI } from "apis";
import { IconHeart } from "components/Icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

const SaveWishlist = () => {
  const { id = "" } = useParams();
  const { currentUser } = useStore((state) => state);
  const [isSaved, setIsSaved] = useState(false);

  const fetchMyWishlist = async () => {
    try {
      const { data } = await wishlistAPI.getMyWishlist();
      const index = data.findIndex((product: IProduct) => product._id === id);
      setIsSaved(index !== -1);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleAddToWishlist = async () => {
    try {
      if (!currentUser?._id) {
        toast.error("Vui lòng đăng nhập để thêm yêu thích");
        return;
      }
      const { message } = await wishlistAPI.addToWishlist(id);
      toast.success(message);
      setIsSaved(true);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleRemoveFromWishlist = async () => {
    try {
      const { message } = await wishlistAPI.removeFromWishlist(id);
      toast.success(message);
      setIsSaved(false);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (currentUser?._id) fetchMyWishlist();
  }, [id, currentUser]);

  return (
    <div className="flex items-center gap-x-2">
      {isSaved ? (
        <button type="button" onClick={handleRemoveFromWishlist}>
          <IconHeart active />
        </button>
      ) : (
        <button type="button" onClick={handleAddToWishlist}>
          <IconHeart active={false} />
        </button>
      )}
      <span className="text-sm">Đã thích</span>
    </div>
  );
};

export default SaveWishlist;
