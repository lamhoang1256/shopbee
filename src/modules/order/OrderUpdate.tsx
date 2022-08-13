import { orderAPI } from "apis";
import { Button } from "components/button";
import { SectionWhite } from "components/common";
import { Loading } from "components/loading";
import { Select } from "components/select";
import { IOrder } from "@types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderOverview from "./OrderOverview";
import OrderPayment from "./OrderPayment";
import OrderProduct from "./OrderProduct";
import OrderStatus from "./OrderStatus";

const OrderUpdate = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder>(Object);
  const [loading, setLoading] = useState(true);
  const fetchDetailsOrder = async () => {
    setLoading(true);
    try {
      const { data } = await orderAPI.getSingleOrder(id || "");
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetailsOrder();
  }, [id]);
  if (loading) return <Loading />;
  const payments = [
    {
      label: "Tổng tiền hàng",
      value: order.oldPrice,
    },
    {
      label: "Phí vận chuyển",
      value: order.shippingFee,
    },
    {
      label: "Voucher từ Shopbee",
      value: order.oldPrice * -1,
    },
    {
      label: "Tổng thanh toán",
      value: order.oldPrice + order.shippingFee - order.promotion,
    },
  ];
  return (
    <>
      <SectionWhite>
        <div className='flex flex-col justify-between md:items-center md:flex-row'>
          <h3 className='text-lg font-medium'>Quản lí đơn hàng</h3>
          <span>ID ĐƠN HÀNG: {order?._id}</span>
        </div>
        <OrderStatus order={order} />
        <OrderOverview order={order} />
      </SectionWhite>
      <SectionWhite className='mt-3'>
        <div className='flex items-center gap-x-5'>
          <span>Trạng thái đơn hàng</span>
          <Select name='status'>
            <option value='1'>Chờ xác nhận</option>
            <option value='2'>Đã thanh toán</option>
            <option value='3'>Đang vận chuyển</option>
            <option value='4'>Giao hàng thành công</option>
          </Select>
          <Button primary>Cập nhật trạng thái</Button>
        </div>
      </SectionWhite>
      <SectionWhite className='mt-3'>
        {order?.orderItems.map((orderItem) => (
          <OrderProduct order={orderItem} key={orderItem.product._id} />
        ))}
      </SectionWhite>
      <OrderPayment payments={payments} />
    </>
  );
};

export default OrderUpdate;
