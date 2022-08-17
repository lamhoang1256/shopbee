import { bannerAPI } from "apis";
import { ActionDelete } from "components/action";
import { ImageUpload } from "components/image";
import { Loading } from "components/loading";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";

const BannerManage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const { data } = await bannerAPI.getAllBanner();
      setBanners(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUploadNewBanner = async (e: any) => {
    try {
      const bannerUrl = await uploadImage(e);
      if (!bannerUrl) return;
      const payload = { bannerUrl };
      const { success, message } = await bannerAPI.addNewBanner(payload);
      if (success) {
        fetchBanners();
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleUpdateBanner = async (e: any, bannerId: string) => {
    try {
      const bannerUrl = await uploadImage(e);
      if (!bannerUrl) return;
      const payload = { bannerUrl };
      const { success, message } = await bannerAPI.updateBanner(bannerId, payload);
      if (success) {
        fetchBanners();
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleDeleteBanner = async (bannerId: string) => {
    try {
      const { success, message } = await bannerAPI.deleteBanner(bannerId);
      if (success) {
        fetchBanners();
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <HeaderTemplate
      label='Quản lí banner'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      {loading && <Loading />}
      {!loading && (
        <div className='grid gap-4 mt-4 lg:grid-cols-2'>
          <ImageUpload
            onChange={handleUploadNewBanner}
            previewImage=''
            className='max-w-full aspect-auto'
          />
          {banners.map((banner: any) => (
            <div className='relative' key={banner._id}>
              <img src={banner.bannerUrl} alt='banner' className='rounded-md' />
              <div className='absolute inset-0'>
                <input
                  type='file'
                  className='w-full h-full opacity-0'
                  onChange={(e) => handleUpdateBanner(e, banner._id)}
                />
              </div>
              <ActionDelete onClick={() => handleDeleteBanner(banner._id)} />
            </div>
          ))}
        </div>
      )}
    </HeaderTemplate>
  );
};

export default BannerManage;
