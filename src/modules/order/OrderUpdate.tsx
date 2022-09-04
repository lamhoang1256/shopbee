import { IOrder, OrderStatus, OrderStatusVietnamese } from "@types";
import { orderAPI } from "apis";
import { SectionWhite } from "components/common";
import { Loading } from "components/loading";
import { Option, Select } from "components/select";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import OrderHeader from "./OrderHeader";
import OrderOverview from "./OrderOverview";
import OrderPayment from "./OrderPayment";
import OrderProduct from "./OrderProduct";
import OrderProgress from "./OrderProgress";

const OrderUpdate = () => {
  const { id = "" } = useParams();
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

  const requestUpdateStatusOrder = async (status: string) => {
    if (status === OrderStatus.processing) {
      const { message } = await orderAPI.processingOrder(id);
      toast.success(message);
    }
    if (status === OrderStatus.shipping) {
      const { message } = await orderAPI.shippingOrder(id);
      toast.success(message);
    }
    if (status === OrderStatus.delivered) {
      const { message } = await orderAPI.deliveredOrder(id);
      toast.success(message);
    }
    if (status === OrderStatus.canceled) {
      const payload = { reasonCancel: "Đơn hàng được hủy bởi Shopbee" };
      const { message } = await orderAPI.cancelOrder(id, payload);
      toast.success(message);
    }
  };

  const handleUpdateStatusOrder = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const status = e.target.value;
      await requestUpdateStatusOrder(status);
      fetchDetailsOrder();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchDetailsOrder();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <>
      <SectionWhite>
        <OrderHeader orderId={order._id}>{OrderStatusVietnamese[order.status]}</OrderHeader>
        <OrderProgress order={order} />
        <OrderOverview order={order} />
      </SectionWhite>
      <SectionWhite className='mt-3'>
        <div className='flex items-center gap-x-5'>
          <span>Trạng thái đơn hàng</span>
          <Select name='status' onChange={handleUpdateStatusOrder}>
            <Option value=''>Trạng thái</Option>
            <Option value={OrderStatus.processing}>Đang xử lí</Option>
            <Option value={OrderStatus.shipping}>Đang vận chuyển</Option>
            <Option value={OrderStatus.delivered}>Đã giao hàng</Option>
            <Option value={OrderStatus.canceled}>Hủy</Option>
          </Select>
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
