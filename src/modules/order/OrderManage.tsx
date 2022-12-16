import { IOrder, IPagination } from "@types";
import { orderAPI } from "apis";
import Button from "components/Button";
import Input from "components/Input";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import { Tabs } from "components/_tabs";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import OrderEmpty from "./OrderEmpty";
import OrderItem from "./OrderItem";

const tabs = [
  { key: "", display: "Tất cả", to: PATH.orderManage },
  { key: "processing", display: "Đã thanh toán", to: `${PATH.orderManage}?status=processing` },
  { key: "shipping", display: "Đang giao hàng", to: `${PATH.orderManage}?status=shipping` },
  { key: "delivered", display: "Đã giao hàng", to: `${PATH.orderManage}?status=delivered` },
  { key: "canceled", display: "Đã hủy", to: `${PATH.orderManage}?status=canceled` }
];

const OrderManage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const params = Object.fromEntries(searchParams);
  const formik = useFormik({
    initialValues: { orderId: "" },
    onSubmit: (values) => {
      setSearchParams(values);
    }
  });

  const fetchAllOrder = async () => {
    try {
      setLoading(true);
      const { data } = await orderAPI.getAllOrderByAdmin(params);
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, [searchParams]);

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
      {loading && <Loading />}
      {!loading && orders.length === 0 && <OrderEmpty />}
      {!loading && orders.length !== 0 && (
        <>
          <div>
            {orders.map((order) => (
              <OrderItem key={order?._id} order={order} />
            ))}
          </div>
          <Pagination pagination={pagination} />
        </>
      )}
    </Template>
  );
};

export default OrderManage;
