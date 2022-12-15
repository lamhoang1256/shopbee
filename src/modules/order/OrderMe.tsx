import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { orderAPI } from "apis";
import { IOrder, IPagination } from "@types";
import { PATH } from "constants/path";
import { InputSearch } from "components/_input";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { OrderEmpty, OrderItem } from "modules/order";
import { Pagination } from "components/_pagination";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const tabs = [
  { key: "", display: "Tất cả", to: PATH.order },
  { key: "processing", display: "Đã thanh toán", to: `${PATH.order}?status=processing` },
  { key: "shipping", display: "Đang giao hàng", to: `${PATH.order}?status=shipping` },
  { key: "delivered", display: "Đã giao hàng", to: `${PATH.order}?status=delivered` },
  { key: "canceled", display: "Đã hủy", to: `${PATH.order}?status=canceled` }
];

const OrderPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const params = Object.fromEntries(searchParams);
  const status = searchParams.get("status") || "";
  const formik = useFormik({
    initialValues: { orderId: "" },
    onSubmit: (values) => {
      setSearchParams(values);
    }
  });

  useEffect(() => {
    const fetchAllOrderMe = async () => {
      try {
        setLoading(true);
        const { data } = await orderAPI.getAllOrder(params);
        setOrders(data.orders);
        setPagination(data.pagination);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrderMe();
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>Đơn hàng của bạn</title>
      </Helmet>
      <Tabs tabs={tabs} query={status} />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <InputSearch
          name="orderId"
          className="mt-3"
          value={formik.values.orderId}
          onChange={formik.handleChange}
          placeholder="Tìm kiếm theo đơn hàng theo ID"
        />
      </form>
      {loading && <Loading />}
      {!loading &&
        (orders.length === 0 ? (
          <OrderEmpty />
        ) : (
          <>
            {orders.map((order) => (
              <OrderItem key={order?._id} order={order} />
            ))}
            <Pagination pagination={pagination} />
          </>
        ))}
    </>
  );
};

export default OrderPage;
