import { IVoucher } from "@types";
import { voucherAPI } from "apis";
import { Button } from "components/button";
import { Loading } from "components/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { formatDateVNFull } from "utils/helper";

const VoucherDiscover = () => {
  const { currentUser } = useStore((state) => state);
  const [loading, setLoading] = useState(true);
  const [vouchers, setVouchers] = useState<IVoucher[]>(Object);
  const handleSaveVoucher = async (voucher: string) => {
    try {
      const { message } = await voucherAPI.saveVoucher(voucher);
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchDiscoverVoucher = async () => {
    try {
      setLoading(true);
      const { data } = await voucherAPI.getDiscoverVoucher();
      setVouchers(data.vouchers);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDiscoverVoucher();
  }, []);
  return (
    <div className='layout-container'>
      <Helmet>
        <title>Mã Giảm Giá | Sale Sale Ngày Hội Mua Sắm | Shopee Việt Nam</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
        <>
          <h2 className='mt-6 mb-4 text-base font-medium'>KHÁM PHÁ VOUCHER TỪ SHOPBEE</h2>
          <div className='grid gap-4 md:grid-cols-2'>
            {vouchers.map((voucher) => (
              <div className='flex items-center overflow-hidden bg-white rounded-md gap-x-2 md:gap-x-5 shadow1'>
                <div className='flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 bg-orangeee4'>
                  <img src='/images/voucher.png' className='w-3/5 h-3/5' alt='voucher' />
                  <span className='text-white'>Shopbee</span>
                </div>
                <div className='flex flex-col justify-center flex-1 text-xs md:text-sm'>
                  <h3 className='md:text-base'>{voucher.title}</h3>
                  <span>Code: {voucher.code}</span>
                  {voucher.expirationDate !== 0 && (
                    <span>HSD: {formatDateVNFull(voucher.expirationDate)}</span>
                  )}
                </div>
                {voucher.usersSave.includes(currentUser?._id) ? (
                  <Button
                    primary
                    disabled
                    className='mr-5 bg-[#00000017] hover:bg-[#00000017]'
                    onClick={() => handleSaveVoucher(voucher.code)}
                  >
                    Đã lưu
                  </Button>
                ) : (
                  <Button primary className='mr-5' onClick={() => handleSaveVoucher(voucher.code)}>
                    Lưu
                  </Button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VoucherDiscover;
