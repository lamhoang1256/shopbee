import { wishlistAPI } from "apis";
import { IconHeart } from "components/Icons";
import Rating from "components/Rating";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

interface ProductMetaProps {
  rating: number;
  sold: number;
}

const ProductMeta = ({ rating, sold }: ProductMetaProps) => {
  const { id = "" } = useParams();
  const { currentUser } = useStore((state) => state);
  const [isSaved, setIsSaved] = useState(false);
  const addToWishlistMutation = useMutation({
    mutationFn: (productId: string) => wishlistAPI.addToWishlist(productId)
  });
  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: string) => wishlistAPI.removeFromWishlist(productId)
  });
  useQuery({
    queryKey: ["wishlists"],
    queryFn: () => wishlistAPI.getMyWishlist(),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(currentUser?._id),
    onSuccess: ({ data }) => {
      const foundProductIndex = data.findIndex((product) => product._id === id);
      setIsSaved(foundProductIndex !== -1);
    }
  });
  const handleAddToWishlist = () => {
    if (!currentUser || !currentUser._id) {
      toast.error("Vui lòng đăng nhập để thêm yêu thích");
      return;
    }
    addToWishlistMutation.mutate(id, {
      onSuccess: ({ message }) => {
        toast.success(message);
        setIsSaved(true);
      },
      onError(error: any) {
        toast.error(error?.message);
      }
    });
  };
  const handleRemoveFromWishlist = () => {
    if (!currentUser || !currentUser._id) {
      toast.error("Vui lòng đăng nhập để thêm yêu thích");
      return;
    }
    removeFromWishlistMutation.mutate(id, {
      onSuccess: ({ message }) => {
        toast.success(message);
        setIsSaved(true);
      },
      onError(error: any) {
        toast.error(error?.message);
      }
    });
  };
  return (
    <div className="flex flex-wrap items-center my-4 gap-x-4 gap-y-2">
      <span className="font-medium">{rating}</span>
      <span className="pr-4 border-r">
        <Rating rating={rating} />
      </span>
      <div className="pr-4 border-r border-[#00000024]">
        <span>{sold}</span>
        <span className="pl-3 text-[#767676] text-sm">Đã bán</span>
      </div>
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
    </div>
  );
};

export default ProductMeta;
