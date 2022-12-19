import { orderAPI } from "apis";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import Tabs from "components/Tabs";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import useQueryParams from "hooks/useQueryParams";
import OrderEmpty from "modules/Order/OrderEmpty";
import OrderItem from "modules/Order/OrderItem";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";

const tabs = [
  { key: "", display: "Tất cả", to: PATH.order },
  { key: "processing", display: "Đã thanh toán", to: `${PATH.order}?status=processing` },
  { key: "shipping", display: "Đang giao hàng", to: `${PATH.order}?status=shipping` },
  { key: "delivered", display: "Đã giao hàng", to: `${PATH.order}?status=delivered` },
  { key: "canceled", display: "Đã hủy", to: `${PATH.order}?status=canceled` }
];

const OrderPage = () => {
  const { queryParams, setSearchParams } = useQueryParams();
  const status = queryParams?.status || "";
  const { isLoading, data: ordersData } = useQuery({
    queryKey: ["ordersMe", queryParams],
    queryFn: () => orderAPI.getAllOrder(queryParams),
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
    <>
      <Helmet>
        <title>Đơn hàng của bạn</title>
      </Helmet>
      <Tabs tabs={tabs} query={status} />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <input
          name="orderId"
          className="px-4 py-3 w-full bg-[#eaeaea] outline-none mt-3"
          value={formik.values.orderId}
          onChange={formik.handleChange}
          placeholder="Tìm kiếm theo đơn hàng theo ID"
        />
      </form>
      {isLoading && <Loading />}
      {!isLoading &&
        (ordersData?.data.orders ? (
          <div>
            {ordersData?.data.orders.map((order) => (
              <OrderItem key={order?._id} order={order} />
            ))}
            <Pagination pagination={ordersData?.data.pagination} />
          </div>
        ) : (
          <OrderEmpty />
        ))}
    </>
  );
};

export default OrderPage;
