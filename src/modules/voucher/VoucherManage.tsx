import { IPagination, IVoucher } from "@types";
import { voucherAPI } from "apis";
import { Button } from "components/button";
import { Input } from "components/input";
import { Loading } from "components/loading";
import { Pagination } from "components/pagination";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateVNFull, formatMoney } from "utils/helper";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const status = searchParams.get("status") || "";
  const params = Object.fromEntries(searchParams);
  const [vouchers, setVouchers] = useState<IVoucher[]>(Object);
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      setSearchParams({ ...params, ...values });
    },
  });

  const fetchMyVoucher = async () => {
    setLoading(true);
    try {
      const { data, success } = await voucherAPI.getAllVoucher({ ...params });
      if (success) {
        setVouchers(data.vouchers);
        setPagination(data.pagination);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleDeleteVoucher = async (voucherId: string) => {
    try {
      const { success, message } = await voucherAPI.deleteVoucher(voucherId);
      if (success) {
        toast.success(message);
        fetchMyVoucher();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchMyVoucher();
  }, [searchParams]);

  return (
    <HeaderTemplate label='Quản lí voucher' desc='Khám phá kho voucher'>
      <Tabs tabs={tabs} query={status} className='my-4' />
      {loading && <Loading />}
      {!loading &&
        (vouchers?.length === 0 ? (
          <VoucherEmpty />
        ) : (
          <>
            <form
              onSubmit={formik.handleSubmit}
              autoComplete='off'
              className='flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1'
            >
              <Input
                name='code'
                className='w-full lg:!h-12'
                value={formik.values.code}
                onChange={formik.handleChange}
                placeholder='Tìm kiếm voucher theo mã code'
              />
              <Button primary className='flex-shrink-0 lg:h-12'>
                Tìm kiếm
              </Button>
            </form>
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
                      <td>{formatMoney(voucher.value)}</td>
                      <td>{voucher.userUsed.length}</td>
                      <td>{formatDateVNFull(voucher.createdAt)}</td>
                      <td>{formatDateVNFull(voucher.expirationDate)}</td>
                      <td>
                        <div className='flex gap-x-1'>
                          <Button to={`${path.voucherUpdate}/${voucher._id}`}>Sửa</Button>
                          <Button onClick={() => handleDeleteVoucher(voucher._id)}>Xóa</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination pagination={pagination} />
            </div>
          </>
        ))}
    </HeaderTemplate>
  );
};

export default VoucherManage;
