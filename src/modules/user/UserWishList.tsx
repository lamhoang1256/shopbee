import { IProduct } from "@types";
import { wishlistAPI } from "apis";
import { IconHeart } from "components/icons";
import { Loading } from "components/loading";
import { ProductGrid } from "modules/product";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const UserWishList = () => {
  const [wishlists, setWishlists] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMyWishlist = async () => {
      try {
        setLoading(true);
        const { data } = await wishlistAPI.getMyWishlist();
        setWishlists(data);
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
      {loading && <Loading />}
      {!loading &&
        (wishlists.length > 0 ? (
          <ProductGrid products={wishlists} />
        ) : (
          <div className='flex flex-col items-center justify-center gap-y-1 h-[300px]'>
            <img src='/images/wishlist.png' alt='wishlist' className='w-24 h-24' />
            <h3 className='font-medium text-base text-[#00000066] mt-1'>
              Hãy <IconHeart active className='inline-block scale-[70%]' /> sản phẩm bạn yêu thích
              để xem lại thuận tiện nhất
            </h3>
          </div>
        ))}
    </>
  );
};

export default UserWishList;
