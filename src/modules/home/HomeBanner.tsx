import { configAPI } from "apis/configAPI";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  const fetchHomeBanner = async () => {
    try {
      const { data } = await configAPI.getAllBanner();
      setBanners(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHomeBanner();
  }, []);
  return (
    <div className='layout-container mt-7'>
      <Swiper slidesPerView={1} className='overflow-hidden rounded-md'>
        {banners?.map((banner: any) => (
          <SwiperSlide key={banner._id}>
            <img src={banner.bannerUrl} alt='banner' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
