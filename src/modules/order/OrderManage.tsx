import { IOrder } from "@types";
import { orderAPI } from "apis";
import { Button } from "components/button";
import { Input } from "components/input";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderEmpty from "./OrderEmpty";
import OrderItem from "./OrderItem";

const tabs = [
  { key: "", display: "Tất cả", to: PATH.orderManage },
  { key: "processing", display: "Đã thanh toán", to: `${PATH.orderManage}?status=processing` },
  { key: "shipping", display: "Đang giao hàng", to: `${PATH.orderManage}?status=shipping` },
  { key: "delivered", display: "Đã giao hàng", to: `${PATH.orderManage}?status=delivered` },
  { key: "canceled", display: "Đã hủy", to: `${PATH.orderManage}?status=canceled` },
];

const OrderManage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const params = Object.fromEntries(searchParams);
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
      const { data } = await orderAPI.getAllOrderByAdmin(params);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, [searchParams]);

  return (
    <Template label='Quản lí đơn hàng' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
      <Tabs tabs={tabs} query={status} className='border-[#efefef] border-b' />
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
    </Template>
  );
};

export default OrderManage;
