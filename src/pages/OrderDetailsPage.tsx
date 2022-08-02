import { configAPI } from "apis/configAPI";
import { Loading } from "components/loading";
import { IOrder } from "interfaces";
import { OrderPaymentField, OrderStatus } from "modules/order";
import OrderProductItem from "modules/order/OrderProductItem";
import { ProductPriceSale } from "modules/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatMoney } from "utils/helper";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder>(Object);
  const [loading, setLoading] = useState(true);
  const fetchDetailsOrder = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.getSingleOrder(id || "");
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
  return (
    <div>
      <div className='px-4 py-5 bg-white rounded-md'>
        <div className='flex flex-col justify-between md:items-center md:flex-row'>
          <h3 className='text-lg font-medium'>Quản lí đơn hàng</h3>
          <span>ID ĐƠN HÀNG: {order?._id}</span>
        </div>
        <OrderStatus order={order} />

        <div className='grid grid-cols-1 gap-2 mt-6 lg:grid-cols-2'>
          <div className='p-3 border border-[#e8e8e8]'>
            <h3 className='mb-2 text-lg'>Chi tiết đơn hàng</h3>
            <p>Mã đơn hàng: {order?._id}</p>
            <p>Đặt ngày: {new Date(order?.createdAt).toLocaleDateString("vi-VI")}</p>
          </div>
          <div className='p-3 border border-[#e8e8e8]'>
            <h3 className='mb-2 text-lg'>Thông tin nhận hàng</h3>
            <p>{order?.user?.fullname}</p>
            <p>Email: {order?.user?.email}</p>
            <p>Địa chỉ: {order?.shippingAddress}</p>
          </div>
        </div>
      </div>
      <div className='mt-4 bg-white rounded-md'>
        <div className='p-4 my-3 '>
          {order?.orderItems.map((orderItem) => (
            <OrderProductItem order={orderItem} key={orderItem._id} />
          ))}
        </div>
      </div>

      <div className='p-4 mt-2 bg-white rounded-md'>
        <OrderPaymentField label='Tổng tiền hàng'>
          {formatMoney(order.totalPriceProduct)}
        </OrderPaymentField>
        <OrderPaymentField label='Phí vận chuyển'>
          {formatMoney(order.shippingPrice)}
        </OrderPaymentField>
        <OrderPaymentField label='Voucher từ Shopbee'>
          - {formatMoney(order.totalDiscount)}
        </OrderPaymentField>
        <OrderPaymentField label='Tổng thanh toán'>
          <ProductPriceSale>
            {formatMoney(order.totalPriceProduct + order.shippingPrice - order.totalDiscount)}
          </ProductPriceSale>
        </OrderPaymentField>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
