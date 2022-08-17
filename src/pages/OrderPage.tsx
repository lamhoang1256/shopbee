import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { orderAPI } from "apis";
import { IOrder } from "@types";
import { path } from "constants/path";
import { InputSearch } from "components/input";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { OrderEmpty, OrderItem } from "modules/order";

const tabs = [
  { key: "", display: "Tất cả", to: path.order },
  { key: "processing", display: "Đã thanh toán", to: `${path.order}?status=processing` },
  { key: "shipping", display: "Đang giao hàng", to: `${path.order}?status=shipping` },
  { key: "delivered", display: "Đã giao hàng", to: `${path.order}?status=delivered` },
  { key: "canceled", display: "Đã hủy", to: `${path.order}?status=canceled` },
];

const OrderPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const params = Object.fromEntries(searchParams);
  const status = searchParams.get("status") || "";

  const formik = useFormik({
    initialValues: {
      orderId: "",
    },
    onSubmit: (values) => {
      setSearchParams(values);
    },
  });

  useEffect(() => {
    const fetchAllOrderMe = async () => {
      setLoading(true);
      try {
        const { data } = await orderAPI.getAllOrder(params);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchAllOrderMe();
  }, [searchParams]);
  return (
    <>
      <Tabs tabs={tabs} query={status} />
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <InputSearch
          name='orderId'
          className='mt-3'
          value={formik.values.orderId}
          onChange={formik.handleChange}
          placeholder='Tìm kiếm theo đơn hàng theo ID'
        />
      </form>
      {loading && <Loading />}
      {!loading &&
        (orders.length === 0 ? (
          <OrderEmpty />
        ) : (
          orders.map((order) => <OrderItem key={order?._id} order={order} />)
        ))}
    </>
  );
};

export default OrderPage;
