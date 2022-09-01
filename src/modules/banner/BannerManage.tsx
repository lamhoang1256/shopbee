import { bannerAPI } from "apis";
import { ActionDelete } from "components/action";
import { ImageUpload } from "components/image";
import { Loading } from "components/loading";
import { Template } from "layouts";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { swalDelete } from "utils/swal";
import { uploadImage } from "utils/uploadImage";

const BannerManage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data } = await bannerAPI.getAllBanner();
      setBanners(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewBanner = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newBannerUrl = await uploadImage(e);
      if (!newBannerUrl) return;
      const { message } = await bannerAPI.addNewBanner({ bannerUrl: newBannerUrl });
      fetchBanners();
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleUpdateBanner = async (e: ChangeEvent<HTMLInputElement>, bannerId: string) => {
    try {
      const newBannerUrl = await uploadImage(e);
      if (!newBannerUrl) return;
      const { message } = await bannerAPI.updateBanner(bannerId, { bannerUrl: newBannerUrl });
      fetchBanners();
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleDeleteBanner = async (bannerId: string) => {
    try {
      const { message } = await bannerAPI.deleteBanner(bannerId);
      fetchBanners();
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <Template title='Quản lí banner' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
      {loading && <Loading />}
      {!loading && (
        <div className='grid gap-4 mt-4 lg:grid-cols-2'>
          <ImageUpload
            onChange={handleAddNewBanner}
            previewImage=''
            className='!w-full aspect-auto'
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
              <ActionDelete onClick={() => swalDelete(() => handleDeleteBanner(banner._id))} />
            </div>
          ))}
        </div>
      )}
    </Template>
  );
};

export default BannerManage;
