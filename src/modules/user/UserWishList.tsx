import { IProduct } from "@types";
import { wishlistAPI } from "apis";
import { ProductGrid } from "modules/product";
import { useEffect, useState } from "react";

const UserWishList = () => {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchMyWishlist = async () => {
      try {
        const { data } = await wishlistAPI.getMyWishlist();
        setWishlist(data);
      } catch (error) {
        console.log(`Failed to fetch wishlist:`, error);
      }
    };
    fetchMyWishlist();
  }, []);
  return <ProductGrid products={wishlist} />;
};

export default UserWishList;
