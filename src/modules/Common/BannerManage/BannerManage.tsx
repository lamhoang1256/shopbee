import { IBanner } from "@types";
import { bannerAPI } from "apis";
import ActionDelete from "components/ActionDelete";
import ImageUpload from "components/ImageUpload";
import Loading from "components/Loading";
import Template from "layouts/Template";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { sweetAlertDelete } from "utils/sweetalert2";
import { uploadImage } from "utils/uploadImage";

const BannerManage = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
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
    <Template title="Quản lí banner" desc="Thêm, xóa, sửa các banner của trang chủ">
      <Helmet>
        <title>Quản lí banner</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
        <div className="grid gap-4 mt-4 lg:grid-cols-2">
          <ImageUpload
            previewImage=""
            onChange={handleAddNewBanner}
            className="!w-full aspect-auto"
          />
          {banners.map((banner) => (
            <div className="relative" key={banner._id}>
              <img src={banner.bannerUrl} alt="banner" className="rounded-md" />
              <div className="absolute inset-0">
                <input
                  type="file"
                  className="w-full h-full opacity-0"
                  onChange={(e) => handleUpdateBanner(e, banner._id)}
                />
              </div>
              <ActionDelete
                onClick={() => sweetAlertDelete(() => handleDeleteBanner(banner._id))}
              />
            </div>
          ))}
        </div>
      )}
    </Template>
  );
};

export default BannerManage;
