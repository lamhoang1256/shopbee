import { voucherAPI } from "apis";
import Button from "components/Button";
import Input from "components/Input";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import Tabs from "components/Tabs";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import useQueryParams from "hooks/useQueryParams";
import Template from "layouts/Template";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { formatDateVNFull, formatMoney } from "utils/helper";
import { sweetAlertDelete } from "utils/sweetalert2";
import VoucherEmpty from "../VoucherEmpty/VoucherEmpty";

const tabs = [
  {
    key: "",
    display: "Tất cả",
    to: PATH.voucherManage
  },
  {
    key: "expiration",
    display: "Hết hiệu lực",
    to: `${PATH.voucherManage}?status=expiration`
  }
];

const VoucherManage = () => {
  const { queryParams, setSearchParams } = useQueryParams();
  const queryClient = useQueryClient();
  const status = queryParams?.status || "";
  const formik = useFormik({
    initialValues: { code: "" },
    onSubmit: (values) => {
      setSearchParams({ ...queryParams, ...values });
    }
  });
  const { isLoading, data: vouchersData } = useQuery({
    queryKey: ["vouchers"],
    queryFn: () => voucherAPI.getAllVoucher(),
    staleTime: 5 * 60 * 1000
  });
  const deleteVoucherMutation = useMutation({
    mutationFn: (voucherId: string) => voucherAPI.deleteVoucher(voucherId)
  });
  const handleDeleteVoucher = (voucherId: string) => {
    sweetAlertDelete(() =>
      deleteVoucherMutation.mutate(voucherId, {
        onSuccess: ({ message }) => {
          toast.success(message);
          queryClient.invalidateQueries({ queryKey: ["vouchers"] });
        },
        onError(error: any) {
          toast.error(error.message);
        }
      })
    );
  };
  return (
    <Template title="Quản lí voucher" desc="Khám phá kho voucher">
      <Helmet>
        <title>Quản lí voucher</title>
      </Helmet>
      <Tabs tabs={tabs} query={status} className="my-4" />
      {isLoading && <Loading />}
      {!isLoading && !vouchersData && <VoucherEmpty />}
      {!isLoading && vouchersData && (
        <div>
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
              <thead>
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
                {vouchersData?.data.vouchers.map((voucher, index) => (
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
                        <Button onClick={() => handleDeleteVoucher(voucher._id)}>Xóa</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pagination={vouchersData?.data.pagination} />
        </div>
      )}
    </Template>
  );
};

export default VoucherManage;
