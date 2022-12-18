import { voucherAPI } from "apis";
import Input from "components/Input";
import Loading from "components/Loading";
import Tabs from "components/Tabs";
import { PATH } from "constants/path";
import useQueryParams from "hooks/useQueryParams";
import Template from "layouts/Template";
import VoucherEmpty from "modules/Voucher/VoucherEmpty";
import VoucherItem from "modules/Voucher/VoucherItem";
import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import classNames from "utils/classNames";

const tabs = [
  {
    key: "",
    display: "Tất cả",
    to: PATH.voucherWallet
  },
  {
    key: "used",
    display: "Đã sử dụng",
    to: `${PATH.voucherWallet}?status=used`
  },
  {
    key: "expiration",
    display: "Hết hiệu lực",
    to: `${PATH.voucherWallet}?status=expiration`
  }
];

const VoucherMe = () => {
  const { currentUser } = useStore((state) => state);
  const { queryParams } = useQueryParams();
  const status = queryParams?.status || "";
  const [voucherCode, setVoucherCode] = useState("");
  const {
    isLoading,
    refetch,
    data: myVouchersData
  } = useQuery({
    queryKey: ["myVouchers", status],
    queryFn: () => voucherAPI.getMyVoucher({ status }),
    staleTime: 5 * 60 * 1000
  });
  const saveVoucherMutation = useMutation({
    mutationFn: (code: string) => voucherAPI.saveVoucher(code)
  });
  const handleSaveVoucher = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!voucherCode) return;
    if (!currentUser || !currentUser._id) {
      toast.error("Vui lòng đăng nhập để lưu voucher");
      return;
    }
    saveVoucherMutation.mutate(voucherCode, {
      onSuccess: ({ message }) => {
        toast.success(message);
        refetch();
      },
      onError(error: any) {
        toast.error(error?.message);
      }
    });
  };
  return (
    <Template
      title="Ví voucher"
      desc="Khám phá kho voucher"
      subtitle={
        <Link to={PATH.voucherDiscover} className="text-[#ee4d2d]">
          Tìm thêm voucher
        </Link>
      }
    >
      <Helmet>
        <title>Kho voucher của bạn</title>
      </Helmet>
      <div className="maxsm:p-0 bg-[#00000008] py-7">
        <form
          autoComplete="off"
          onSubmit={handleSaveVoucher}
          className="flex items-center md:gap-3 mx-auto max-w-[620px]"
        >
          <span className="hidden md:block">Mã Voucher</span>
          <Input
            value={voucherCode}
            className="flex-1 maxsm:w-[160px] !h-11"
            placeholder="Nhập mã voucher tại đây"
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <button
            type="submit"
            className={classNames(
              "flex-shrink-0 w-16 sm:w-20  text-white rounded-sm h-11",
              voucherCode ? "bg-orangeee4" : "bg-[#0000001a]"
            )}
          >
            Lưu
          </button>
        </form>
      </div>
      <Tabs tabs={tabs} query={status} className="my-4" />
      {isLoading && <Loading />}
      {!isLoading &&
        (myVouchersData?.data.length === 0 ? (
          <VoucherEmpty />
        ) : (
          <div className="grid gap-4 mt-6 md:grid-cols-2">
            {myVouchersData?.data.map((voucher) => (
              <VoucherItem
                key={voucher?._id}
                code={voucher.code}
                title={voucher.title}
                isFreeship={voucher.isFreeship}
                expirationDate={voucher.expirationDate}
                active={!(status === "expiration" || status === "used")}
              />
            ))}
          </div>
        ))}
    </Template>
  );
};

export default VoucherMe;
