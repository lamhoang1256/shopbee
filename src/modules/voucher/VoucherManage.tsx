import { IVoucher } from "@types";
import { voucherAPI } from "apis";
import { Button } from "components/button";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDateVNFull } from "utils/helper";
import VoucherEmpty from "./VoucherEmpty";

const tabs = [
  { key: "", display: "Tất cả", to: path.voucherManage },
  {
    key: "expiration",
    display: "Hết hiệu lực",
    to: `${path.voucherManage}?status=expiration`,
  },
];

const VoucherManage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const status = searchParams.get("status") || "";
  const [vouchers, setVouchers] = useState<IVoucher[]>(Object);

  const fetchMyVoucher = async () => {
    setLoading(true);
    try {
      const { data, success } = await voucherAPI.getAllVoucher({ status });
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
    <HeaderTemplate label='Quản lí voucher' desc='Khám phá kho voucher'>
      <Tabs tabs={tabs} query={status} className='my-4' />
      {loading && <Loading />}
      {!loading &&
        (vouchers.length === 0 ? (
          <VoucherEmpty />
        ) : (
          <div className='tables'>
            <table>
              <thead className=''>
                <tr>
                  <th>STT</th>
                  <th>Mã code</th>
                  <th>Giá trị</th>
                  <th>Lượt dùng</th>
                  <th>Ngày tạo</th>
                  <th>Hạn sử dụng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher, index) => (
                  <tr key={voucher._id}>
                    <td>{index + 1}</td>
                    <td>{voucher.code}</td>
                    <td>{voucher.value}</td>
                    <td>{voucher.userUsed.length}</td>
                    <td>{formatDateVNFull(voucher.createdAt)}</td>
                    <td>{formatDateVNFull(Number(voucher.expirationDate) * 1000)}</td>
                    <td>
                      <div className='flex gap-x-1'>
                        <Button to=''>Sửa</Button>
                        <Button onClick={() => {}}>Xóa</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Pagination pagination={pagination} /> */}
          </div>
        ))}
    </HeaderTemplate>
  );
};

export default VoucherManage;
