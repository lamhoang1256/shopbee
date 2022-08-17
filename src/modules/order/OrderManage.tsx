import { IOrder } from "@types";
import { orderAPI } from "apis";
import { Button } from "components/button";
import { Input } from "components/input";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderEmpty from "./OrderEmpty";
import OrderItem from "./OrderItem";

const tabs = [
  { key: 0, display: "Tất cả", to: path.orderManage },
  { key: 1, display: "Đã thanh toán", to: `${path.orderManage}?status=1` },
  { key: 2, display: "Đang giao hàng", to: `${path.orderManage}?status=2` },
  { key: 3, display: "Đã giao hàng", to: `${path.orderManage}?status=3` },
];

const OrderManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const status = searchParams.get("status") || "";
  const formik = useFormik({
    initialValues: {
      orderId: "",
    },
    onSubmit: (values) => {
      setSearchParams(values);
    },
  });

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const params = status ? { status } : {};
      const { data } = await orderAPI.getAllOrderByAdmin(params);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, [status]);
  if (loading) return <Loading />;
  return (
    <HeaderTemplate
      label='Quản lí đơn hàng'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <Tabs tabs={tabs} query={status} />
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className='flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1'
      >
        <Input
          name='orderId'
          className='w-full'
          value={formik.values.orderId}
          onChange={formik.handleChange}
          placeholder='Tìm kiếm đơn hàng theo ID'
        />
        <Button primary className='flex-shrink-0 h-10'>
          Tìm kiếm
        </Button>
      </form>

      {loading && <Loading />}
      {!loading &&
        (orders.length === 0 ? (
          <OrderEmpty />
        ) : (
          orders.map((order) => <OrderItem key={order?._id} order={order} />)
        ))}
    </HeaderTemplate>
  );
};

export default OrderManage;
