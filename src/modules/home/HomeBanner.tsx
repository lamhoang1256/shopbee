import { configAPI } from "apis/configAPI";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchHomeBanner = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.getAllBanner();
      setBanners(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHomeBanner();
  }, []);

  if (loading) {
    return (
      <div className='layout-container mt-7'>
        <div className='h-[360px] bg-[#fafafa] flex justify-center items-center'>
          <img src='/images/img-loading.png' alt='banner' className='w-16 h-16' />
        </div>
      </div>
    );
  }
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
