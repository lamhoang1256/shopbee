import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IOrder } from "@types";
import { orderAPI } from "apis";
import { Loading } from "components/loading";
import { OrderOverview, OrderPayment, OrderProduct, OrderStatus } from "modules/order";

const OrderDetailsPage = () => {
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
      <div className='px-4 py-5 bg-white rounded-md'>
        <div className='flex flex-col justify-between md:items-center md:flex-row'>
          <h3 className='text-lg font-medium'>Quản lí đơn hàng</h3>
          <span>ID ĐƠN HÀNG: {order?._id}</span>
        </div>
        <OrderStatus order={order} />
        <OrderOverview order={order} />
      </div>
      <div className='p-4 mt-4 bg-white rounded-md'>
        {order?.orderItems.map((orderItem) => (
          <OrderProduct order={orderItem} key={orderItem.product._id} />
        ))}
      </div>
      <OrderPayment payments={payments} />
    </>
  );
};

export default OrderDetailsPage;
