import { IVoucher } from "@types";
import { voucherAPI } from "apis";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VoucherEmpty from "./VoucherEmpty";
import VoucherItem from "./VoucherItem";
import VoucherSave from "./VoucherSave";

const tabs = [
  { key: "", display: "Tất cả", to: path.voucher },
  { key: "used", display: "Đã sử dụng", to: `${path.voucher}?status=used` },
  {
    key: "expiration",
    display: "Hết hiệu lực",
    to: `${path.voucher}?status=expiration`,
  },
];

const VoucherMe = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const status = searchParams.get("status") || "";
  const [vouchers, setVouchers] = useState<IVoucher[]>(Object);

  const fetchMyVoucher = async () => {
    setLoading(true);
    try {
      const { data, success } = await voucherAPI.getMyVoucher({ status });
      if (success) {
        setVouchers(data);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchMyVoucher();
  }, [status]);

  return (
    <Template label='Ví voucher' desc='Khám phá kho voucher'>
      <VoucherSave fetchReloadVoucher={fetchMyVoucher} />
      <Tabs tabs={tabs} query={status} className='my-4' />
      {loading && <Loading />}
      {!loading &&
        (vouchers.length === 0 ? (
          <VoucherEmpty />
        ) : (
          <div className='grid gap-4 mt-6 md:grid-cols-2'>
            {vouchers.map((order) => (
              <VoucherItem
                active={!(status === "expiration" || status === "used")}
                key={order?._id}
                voucher={order}
              />
            ))}
          </div>
        ))}
    </Template>
  );
};

export default VoucherMe;
