import { orderAPI } from "apis";
import { Loading } from "components/loading";
import { IOrder } from "@types";
import { OrderOverview, OrderPayment, OrderStatus } from "modules/order";
import OrderProductItem from "modules/order/OrderProductItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      value: order.totalPriceProduct,
    },
    {
      label: "Phí vận chuyển",
      value: order.shippingPrice,
    },
    {
      label: "Voucher từ Shopbee",
      value: order.totalPriceProduct * -1,
    },
    {
      label: "Tổng thanh toán",
      value: order.totalPriceProduct + order.shippingPrice - order.totalDiscount,
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
          <OrderProductItem order={orderItem} key={orderItem._id} />
        ))}
      </div>
      <OrderPayment payments={payments} />
    </>
  );
};

export default OrderDetailsPage;
