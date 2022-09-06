import { IProduct } from "@types";
import { wishlistAPI } from "apis";
import { Loading } from "components/loading";
import { ProductGrid } from "modules/product";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const UserWishList = () => {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMyWishlist = async () => {
      try {
        setLoading(true);
        const { data } = await wishlistAPI.getMyWishlist();
        setWishlist(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyWishlist();
  }, []);
  return (
    <>
      <Helmet>
        <title>Sản phẩm yêu thích</title>
      </Helmet>
      <h2 className='text-base font-medium'>Sản phẩm yêu thích của bạn</h2>
      {loading ? <Loading /> : <ProductGrid products={wishlist} />}
    </>
  );
};

export default UserWishList;
