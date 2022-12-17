import { wishlistAPI } from "apis";
import { IconHeart } from "components/Icons";
import Loading from "components/Loading";
import ProductList from "modules/Product/ProductList";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";

const UserWishList = () => {
  const { isLoading, data: wishlistsData } = useQuery({
    queryKey: ["wishlists"],
    queryFn: () => wishlistAPI.getMyWishlist(),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  return (
    <>
      <Helmet>
        <title>Sản phẩm yêu thích</title>
      </Helmet>
      <h2 className="text-base font-medium">Sản phẩm yêu thích của bạn</h2>
      {isLoading && <Loading />}
      {!isLoading &&
        (wishlistsData && wishlistsData?.data.length > 0 ? (
          <ProductList products={wishlistsData?.data} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-1 h-[300px]">
            <img src="/wishlist.png" alt="Sản phẩm yêu thích" className="w-24 h-24" />
            <h3 className="font-medium text-base text-[#00000066] mt-1">
              Hãy <IconHeart active className="inline-block scale-[70%]" /> sản phẩm bạn yêu thích
              để xem lại thuận tiện nhất
            </h3>
          </div>
        ))}
    </>
  );
};

export default UserWishList;
