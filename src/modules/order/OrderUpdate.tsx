import { IOrder, OrderStatusLabel } from "@types";
import { orderAPI } from "apis";
import { Button } from "components/button";
import { SectionWhite } from "components/common";
import { Loading } from "components/loading";
import { Option, Select } from "components/select";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import OrderHeader from "./OrderHeader";
import OrderOverview from "./OrderOverview";
import OrderPayment from "./OrderPayment";
import OrderProduct from "./OrderProduct";
import OrderProgress from "./OrderProgress";

const OrderUpdate = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<IOrder>(Object);
  const fetchDetailsOrder = async () => {
    try {
      setLoading(true);
      const { data } = await orderAPI.getSingleOrder(id || "");
      setOrder(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetailsOrder();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <>
      <SectionWhite>
        <OrderHeader orderId={order._id}>{OrderStatusLabel[order.status]}</OrderHeader>
        <OrderProgress order={order} />
        <OrderOverview order={order} />
      </SectionWhite>
      <SectionWhite className='mt-3'>
        <div className='flex items-center gap-x-5'>
          <span>Trạng thái đơn hàng</span>
          <Select name='status'>
            <Option value='1'>Chờ xác nhận</Option>
            <Option value='2'>Đã thanh toán</Option>
            <Option value='3'>Đang vận chuyển</Option>
            <Option value='4'>Đã giao hàng</Option>
          </Select>
          <Button primary>Chỉnh sửa trạng thái</Button>
        </div>
      </SectionWhite>
      <SectionWhite className='mt-3'>
        {order?.orderItems.map((orderItem) => (
          <OrderProduct order={orderItem} key={orderItem.product._id} />
        ))}
      </SectionWhite>
      <OrderPayment
        price={order.price}
        shippingFee={order.shippingFee}
        promotion={order.promotion}
        total={order.total}
      />
    </>
  );
};

export default OrderUpdate;
