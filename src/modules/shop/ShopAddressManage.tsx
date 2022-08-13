import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addressAPI } from "apis";
import { path } from "constants/path";
import { IShopAddress } from "@types";
import classNames from "utils/className";
import { HeaderTemplate } from "layouts";
import { Button } from "components/button";
import { Loading } from "components/loading";

const stylesLabel = "px-[2px] py-1 border-[#0000008a] border-[0.5px] rounded-[1px] mr-2";
const ShopAddressManage = () => {
  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState<IShopAddress[]>([]);
  const fetchShopAddress = async () => {
    setLoading(true);
    try {
      let { data } = await addressAPI.getAllShopAddress();
      data = data.sort(
        (x: any, y: any) => -1 * (Number(x.settingDefault) - Number(y.settingDefault)),
      );
      setAddressList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangeDefaultShopAddress = async (addressId: string) => {
    try {
      const { success, message } = await addressAPI.changeDefaultShopAddress(addressId);
      if (success) {
        toast.success(message);
        fetchShopAddress();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleDeleteShopAddress = async (addressId: string) => {
    try {
      const { success, message } = await addressAPI.deleteShopAddress(addressId);
      if (success) {
        toast.success(message);
        fetchShopAddress();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchShopAddress();
  }, []);
  return (
    <HeaderTemplate
      label='Quản lí địa chỉ shop'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      {loading && <Loading />}
      {!loading && (
        <>
          <span>Địa chỉ</span>
          {addressList.map((address) => (
            <div
              key={address._id}
              className='flex md:items-center md:flex-row flex-col justify-between border-b-[1px] py-5 border-[#efefef] gap-3'
            >
              <div>
                <div className='flex items-center gap-x-3'>
                  <h3 className='text-lg text-black'>Nguyễn Hoàng Lâm</h3>
                  <span>(+84) 8317242473</span>
                </div>
                <p>
                  {address.street}, {address.address}
                </p>
                {address.settingDefault && (
                  <div className='mt-3'>
                    <span className={classNames(stylesLabel, "text-orangeee4 !border-orangeee4")}>
                      Mặc định
                    </span>
                    <span className={stylesLabel}>Địa chỉ lấy hàng</span>
                    <span className={stylesLabel}>Địa chỉ trả hàng</span>
                  </div>
                )}
              </div>
              <div className='flex flex-col flex-shrink-0 gap-1'>
                <div className='flex'>
                  <Button
                    to={`${path.address}/${address._id}`}
                    className='border-none text-blue08f'
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className='border-none text-blue08f'
                    onClick={() => handleDeleteShopAddress(address._id)}
                  >
                    Xóa
                  </Button>
                </div>
                <Button onClick={() => handleChangeDefaultShopAddress(address._id)}>
                  Thiết lập mặc định
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </HeaderTemplate>
  );
};

export default ShopAddressManage;
