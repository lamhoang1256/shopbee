import { bannerAPI } from "apis";
import { ActionDelete } from "components/action";
import { ImageUpload } from "components/image";
import { Loading } from "components/loading";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewBanner = async (e: any) => {
    try {
      const newBannerUrl = await uploadImage(e);
      if (!newBannerUrl) return;
      const payload = { bannerUrl: newBannerUrl };
      const { message } = await bannerAPI.addNewBanner(payload);
      fetchBanners();
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleUpdateBanner = async (e: any, bannerId: string) => {
    try {
      const newBannerUrl = await uploadImage(e);
      if (!newBannerUrl) return;
      const payload = { bannerUrl: newBannerUrl };
      const { message } = await bannerAPI.updateBanner(bannerId, payload);
      fetchBanners();
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleDeleteBanner = async (bannerId: string) => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắc muốn xóa banner này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { message } = await bannerAPI.deleteBanner(bannerId);
          fetchBanners();
          toast.success(message);
        } catch (error: any) {
          toast.error(error?.message);
        }
      }
    });
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
