import { IProduct } from "@types";
import { userAPI } from "apis";
import { ProductCard } from "modules/product";
import { useEffect, useState } from "react";

const UserWishList = () => {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchMyWishlist = async () => {
      try {
        const { data } = await userAPI.getMyWishlist();
        setWishlist(data.wishlist);
      } catch (error) {
        console.log(`Failed to fetch wishlist:`, error);
      }
    };
    fetchMyWishlist();
  }, []);
  return (
    <div className='my-3 product-grid'>
      {wishlist?.map((product: IProduct) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default UserWishList;
