import { orderAPI } from "apis";
import Button from "components/Button";
import Input from "components/Input";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import Tabs from "components/Tabs";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import useQueryParams from "hooks/useQueryParams";
import Template from "layouts/Template";
import OrderEmpty from "modules/Order/OrderEmpty";
import OrderItem from "modules/Order/OrderItem";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";

const tabs = [
  {
    key: "",
    display: "Tất cả",
    to: PATH.orderManage
  },
  {
    key: "processing",
    display: "Đã thanh toán",
    to: `${PATH.orderManage}?status=processing`
  },
  {
    key: "shipping",
    display: "Đang giao hàng",
    to: `${PATH.orderManage}?status=shipping`
  },
  {
    key: "delivered",
    display: "Đã giao hàng",
    to: `${PATH.orderManage}?status=delivered`
  },
  {
    key: "canceled",
    display: "Đã hủy",
    to: `${PATH.orderManage}?status=canceled`
  }
];

const OrderManage = () => {
  const { queryParams, setSearchParams } = useQueryParams();
  const status = queryParams?.status || "";
  const { isLoading, data: ordersData } = useQuery({
    queryKey: ["orders", queryParams],
    queryFn: () => orderAPI.getAllOrderByAdmin(queryParams),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  const formik = useFormik({
    initialValues: { orderId: "" },
    onSubmit: (values) => {
      setSearchParams(values);
    }
  });
  return (
    <Template title="Quản lí đơn hàng" desc="Danh sách các đơn hàng của shop">
      <Helmet>
        <title>Quản lí đơn hàng</title>
      </Helmet>
      <Tabs tabs={tabs} query={status} className="border-[#efefef] border-b" />
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1"
      >
        <Input
          name="orderId"
          className="w-full"
          value={formik.values.orderId}
          onChange={formik.handleChange}
          placeholder="Tìm kiếm đơn hàng theo ID"
        />
        <Button primary className="flex-shrink-0 h-10">
          Tìm kiếm
        </Button>
      </form>
      {isLoading && <Loading />}
      {!isLoading && ordersData?.data ? (
        <div>
          {ordersData?.data.orders.map((order) => (
            <OrderItem key={order?._id} order={order} />
          ))}
          <Pagination pagination={ordersData?.data.pagination} />
        </div>
      ) : (
        <OrderEmpty />
      )}
    </Template>
  );
};

export default OrderManage;
