import { IVoucher } from "@types";
import { voucherAPI } from "apis";
import Loading from "components/Loading";
import { Tabs } from "components/_tabs";
import { PATH } from "constants/path";
import Template from "layouts/Template";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import VoucherEmpty from "./VoucherEmpty";
import VoucherItem from "./VoucherItem";
import VoucherSave from "./VoucherSave";

const tabs = [
  { key: "", display: "Tất cả", to: PATH.voucherWallet },
  { key: "used", display: "Đã sử dụng", to: `${PATH.voucherWallet}?status=used` },
  {
    key: "expiration",
    display: "Hết hiệu lực",
    to: `${PATH.voucherWallet}?status=expiration`
  }
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
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyVoucher();
  }, [status]);

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
      <VoucherSave fetchReloadVoucher={fetchMyVoucher} />
      <Tabs tabs={tabs} query={status} className="my-4" />
      {loading && <Loading />}
      {!loading &&
        (vouchers.length === 0 ? (
          <VoucherEmpty />
        ) : (
          <div className="grid gap-4 mt-6 md:grid-cols-2">
            {vouchers.map((voucher) => (
              <VoucherItem
                key={voucher?._id}
                active={!(status === "expiration" || status === "used")}
                title={voucher.title}
                isFreeship={voucher.isFreeship}
                code={voucher.code}
                expirationDate={voucher.expirationDate}
              />
            ))}
          </div>
        ))}
    </Template>
  );
};

export default VoucherMe;
