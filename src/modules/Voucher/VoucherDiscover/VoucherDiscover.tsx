import { voucherAPI } from "apis";
import Button from "components/Button";
import Loading from "components/Loading";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { formatDateVNFull } from "utils";
import classNames from "utils/classNames";

const stylesImageBox = "w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center";
const VoucherDiscover = () => {
  const { currentUser } = useStore((state) => state);
  const { isLoading, data: vouchersData } = useQuery({
    queryKey: ["vouchersDiscover"],
    queryFn: () => voucherAPI.getDiscoverVoucher(),
    staleTime: 5 * 60 * 1000
  });
  const saveVoucherMutation = useMutation({
    mutationFn: (code: string) => voucherAPI.saveVoucher(code),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError(error: any) {
      toast.error(error?.message);
    }
  });
  const handleSaveVoucher = async (voucher: string) => {
    if (!currentUser || !currentUser._id) {
      toast.error("Vui lòng đăng nhập để lưu voucher");
      return;
    }
    saveVoucherMutation.mutate(voucher);
  };
  return (
    <>
      <Helmet>
        <title>Mã Giảm Giá | Sale Sale Ngày Hội Mua Sắm | Shopee Việt Nam</title>
      </Helmet>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="layout-container">
          <h2 className="mt-6 mb-4 text-base font-medium">KHÁM PHÁ VOUCHER TỪ SHOPBEE</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {vouchersData?.data.vouchers.map((voucher) => (
              <div className="flex items-center pr-5 overflow-hidden bg-white rounded-md gap-x-2 md:gap-x-5 shadow1">
                {voucher.isFreeship ? (
                  <div className={classNames(stylesImageBox, "bg-[#00bfa5]")}>
                    <span className="font-medium text-center text-white">MIỄN PHÍ VẬN CHUYỂN</span>
                  </div>
                ) : (
                  <div className={classNames(stylesImageBox, "bg-orangeee4")}>
                    <img
                      alt="voucher-discover"
                      src="/voucher-shopbee.png"
                      className="w-3/5 h-3/5"
                    />
                    <span className="text-white">Shopbee</span>
                  </div>
                )}
                <div className="flex flex-col justify-center flex-1 text-xs md:text-sm">
                  <h3 className="md:text-base">{voucher.title}</h3>
                  <span>Code: {voucher.code}</span>
                  {voucher.expirationDate !== 0 && (
                    <span>HSD: {formatDateVNFull(voucher.expirationDate)}</span>
                  )}
                </div>
                {voucher.usersSave.includes(currentUser?._id as string) ? (
                  <Button
                    primary
                    disabled
                    className="bg-black017 hover:bg-black017"
                    onClick={() => handleSaveVoucher(voucher.code)}
                  >
                    Đã lưu
                  </Button>
                ) : (
                  <Button primary onClick={() => handleSaveVoucher(voucher.code)}>
                    Lưu
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VoucherDiscover;
