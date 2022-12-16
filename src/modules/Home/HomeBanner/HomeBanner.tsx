import { bannerAPI } from "apis";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = () => {
  const { isLoading, data: bannersData } = useQuery({
    queryKey: ["banners"],
    queryFn: () => bannerAPI.getAllBanner(),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  if (isLoading || !bannersData) {
    return (
      <div className="layout-container mt-7">
        <div className="h-[360px] bg-[#fafafa] flex justify-center items-center">
          <img src="/logo-gray.png" alt="banner" className="w-16 h-16" />
        </div>
      </div>
    );
  }
  return (
    <div className="layout-container mt-7">
      <Swiper slidesPerView={1} className="overflow-hidden rounded-md">
        {bannersData?.data.map((banner) => (
          <SwiperSlide key={banner._id}>
            <img src={banner.bannerUrl} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
