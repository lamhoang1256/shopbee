import { IPagination, IVoucher } from "@types";
import { voucherAPI } from "apis";
import Button from "components/Button";
import Input from "components/Input";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import { Tabs } from "components/_tabs";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateVNFull, formatMoney } from "utils/helper";
import { swalDelete } from "utils/sweetalert2";
import VoucherEmpty from "./VoucherEmpty";

const tabs = [
  { key: "", display: "Tất cả", to: PATH.voucherManage },
  {
    key: "expiration",
    display: "Hết hiệu lực",
    to: `${PATH.voucherManage}?status=expiration`
  }
];

const VoucherManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const status = searchParams.get("status") || "";
  const params = Object.fromEntries(searchParams);
  const [vouchers, setVouchers] = useState<IVoucher[]>(Object);
  const formik = useFormik({
    initialValues: { code: "" },
    onSubmit: (values) => {
      setSearchParams({ ...params, ...values });
    }
  });

  const fetchMyVoucher = async () => {
    try {
      setLoading(true);
      const { data } = await voucherAPI.getAllVoucher({ ...params });
      setVouchers(data.vouchers);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVoucher = async (voucherId: string) => {
    try {
      const { message } = await voucherAPI.deleteVoucher(voucherId);
      fetchMyVoucher();
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchMyVoucher();
  }, [searchParams]);

  return (
    <Template title="Quản lí voucher" desc="Khám phá kho voucher">
      <Helmet>
        <title>Quản lí voucher</title>
      </Helmet>
      <Tabs tabs={tabs} query={status} className="my-4" />
      {loading && <Loading />}
      {!loading && vouchers?.length === 0 && <VoucherEmpty />}
      {!loading && vouchers?.length !== 0 && (
        <>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            className="flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1"
          >
            <Input
              name="code"
              className="w-full lg:!h-12"
              value={formik.values.code}
              onChange={formik.handleChange}
              placeholder="Tìm kiếm voucher theo mã code"
            />
            <Button primary className="flex-shrink-0 lg:h-12">
              Tìm kiếm
            </Button>
          </form>
          <div className="tables">
            <table>
              <thead className="">
                <tr>
                  <th>STT</th>
                  <th>Mã code</th>
                  <th>Giá trị</th>
                  <th>Đã dùng</th>
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
                    <td>{voucher.usersUsed.length} lượt</td>
                    <td>{formatDateVNFull(voucher.createdAt)}</td>
                    <td>{formatDateVNFull(voucher.expirationDate)}</td>
                    <td>
                      <div className="flex gap-x-1">
                        <Button to={`${PATH.voucherUpdate}/${voucher._id}`}>Sửa</Button>
                        <Button onClick={() => swalDelete(() => handleDeleteVoucher(voucher._id))}>
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination pagination={pagination} />
          </div>
        </>
      )}
    </Template>
  );
};

export default VoucherManage;
