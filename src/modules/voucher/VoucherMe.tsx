import { IVoucher } from "@types";
import { voucherAPI } from "apis";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { PATH } from "constants/path";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import VoucherEmpty from "./VoucherEmpty";
import VoucherItem from "./VoucherItem";
import VoucherSave from "./VoucherSave";

const tabs = [
  { key: "", display: "Tất cả", to: PATH.voucher },
  { key: "used", display: "Đã sử dụng", to: `${PATH.voucher}?status=used` },
  {
    key: "expiration",
    display: "Hết hiệu lực",
    to: `${PATH.voucher}?status=expiration`,
  },
];

const VoucherMe = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const status = searchParams.get("status") || "";
  const [vouchers, setVouchers] = useState<IVoucher[]>(Object);

  const fetchMyVoucher = async () => {
    try {
      setLoading(true);
      const { data } = await voucherAPI.getMyVoucher({ status });
      setVouchers(data);
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyVoucher();
  }, [status]);

  return (
    <Template title='Ví voucher' desc='Khám phá kho voucher'>
      <VoucherSave fetchReloadVoucher={fetchMyVoucher} />
      <Tabs tabs={tabs} query={status} className='my-4' />
      {loading && <Loading />}
      {!loading &&
        (vouchers.length === 0 ? (
          <VoucherEmpty />
        ) : (
          <div className='grid gap-4 mt-6 md:grid-cols-2'>
            {vouchers.map((voucher) => (
              <VoucherItem
                active={!(status === "expiration" || status === "used")}
                key={voucher?._id}
                title={voucher.title}
                expirationDate={voucher.expirationDate}
              />
            ))}
          </div>
        ))}
    </Template>
  );
};

export default VoucherMe;
