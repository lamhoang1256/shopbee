import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bannerAPI } from "apis";
import "swiper/css";
import { toast } from "react-toastify";
import { IBanner } from "@types";

const HomeBanner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchHomeBanner = async () => {
    try {
      setLoading(true);
      const { data } = await bannerAPI.getAllBanner();
      setBanners(data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHomeBanner();
  }, []);

  if (loading) {
    return (
      <div className="layout-container mt-7">
        <div className="h-[360px] bg-[#fafafa] flex justify-center items-center">
          <img src="/images/logo-gray.png" alt="banner" className="w-16 h-16" />
        </div>
      </div>
    );
  }
  return (
    <div className="layout-container mt-7">
      <Swiper slidesPerView={1} className="overflow-hidden rounded-md">
        {banners?.map((banner) => (
          <SwiperSlide key={banner._id}>
            <img src={banner.bannerUrl} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
