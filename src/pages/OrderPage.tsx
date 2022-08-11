import { orderAPI } from "apis";
import { InputSearch } from "components/input";
import { Loading } from "components/loading";
import { Tabs } from "components/tabs";
import { path } from "constants/path";
import { useFormik } from "formik";
import { OrderItem } from "modules/order";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const tabs = [
  { key: 0, display: "Tất cả", to: path.order },
  { key: 1, display: "Đã thanh toán", to: `${path.order}?status=1` },
  { key: 2, display: "Đang giao hàng", to: `${path.order}?status=2` },
  { key: 3, display: "Đã giao hàng", to: `${path.order}?status=3` },
];

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const status = searchParams.get("status") || "";

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const params = status ? { status } : {};
      const { data } = await orderAPI.getAllOrder(params);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log("values: ", values);
    },
  });

  useEffect(() => {
    fetchAllOrder();
  }, [status]);
  if (loading) return <Loading />;
  return (
    <>
      <Tabs tabs={tabs} query={status} />
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <InputSearch
          value={formik.values.name}
          onChange={formik.handleChange}
          className='mt-3'
          name='name'
          placeholder='Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm'
        />
      </form>
      {orders.map((order: any) => (
        <OrderItem key={order?._id} order={order} />
      ))}
    </>
  );
};

export default OrderPage;
