import { configAPI } from "apis/configAPI";
import { IconCheck, IconClipboard, IconMoney, IconShipping } from "components/icons";
import { IOrder } from "interfaces/order";
import { OrderStatusIcon, OrderStatusItem } from "modules/order";
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
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetailsOrder();
  }, [id]);
  if (loading) return <div>Loading</div>;
  const calcWidthActiveStatusBar = () => {
    if (order?.isPaid && order?.isShipping && order?.isDelivered) return 75;
    if (order?.isPaid && order?.isShipping) return 50;
    if (order?.isPaid) return 25;
    return 0;
  };
  return (
    <div>
      <div className='px-4 py-5 bg-white rounded-md'>
        <div className='relative w-[700px] mx-auto'>
          <div
            style={{ width: `${calcWidthActiveStatusBar()}%` }}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 h-1 bg-[#2dc258] z-10'
          />
          <div className='absolute top-1/2 w-3/4 left-1/2 -translate-x-1/2 h-1 bg-[#dbdbdb]' />
          <div className='relative z-20 grid grid-cols-4'>
            <OrderStatusIcon active>
              <IconClipboard />
            </OrderStatusIcon>
            <OrderStatusIcon active={order?.isPaid}>
              <IconMoney />
            </OrderStatusIcon>
            <OrderStatusIcon active={order?.isShipping}>
              <IconShipping />
            </OrderStatusIcon>
            <OrderStatusIcon active={order?.isDelivered}>
              <IconCheck />
            </OrderStatusIcon>
          </div>
        </div>
        <div className='mt-2 w-[700px] mx-auto grid grid-cols-4 text-center'>
          <OrderStatusItem label='Chờ xác nhận'>
            {new Date(order?.paidAt).toLocaleDateString()}
          </OrderStatusItem>
          <OrderStatusItem label='Đã thanh toán'>
            {new Date(order?.paidAt).toLocaleDateString()}
          </OrderStatusItem>
          <OrderStatusItem label='Đang vận chuyển'>
            {new Date(order?.shippingAt).toLocaleDateString()}
          </OrderStatusItem>
          <OrderStatusItem label='Giao hàng thành công'>
            {new Date(order?.deliveredAt).toLocaleDateString()}
          </OrderStatusItem>
        </div>
        <div className='grid grid-cols-2 mt-6 gap-x-2'>
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
      <div className='mt-4 bg-white rounded-md '>
        <div className='p-4 my-3 '>
          {order?.orderItems.map((orderItem) => (
            <OrderProductItem order={orderItem} />
          ))}
        </div>
      </div>
      <div className='p-4 mt-2 bg-white rounded-md'>
        <div className='flex text-right'>
          <div className='flex-1 py-3'>Tổng tiền hàng</div>
          <div className='py-3 w-60'>{formatMoney(order.totalPriceProduct)}</div>
        </div>
        <div className='flex text-right'>
          <div className='flex-1 py-3'>Phí vận chuyển</div>
          <div className='py-3 w-60'>{formatMoney(order.shippingPrice)}</div>
        </div>
        <div className='flex text-right'>
          <div className='flex-1 py-3'>Voucher từ Shopbee</div>
          <div className='py-3 w-60'>- {formatMoney(order.totalDiscount)}</div>
        </div>
        <div className='flex text-right'>
          <div className='flex-1 py-3'>
            <h3>Tổng số tiền</h3>
          </div>
          <div className='py-3 w-60'>
            <ProductPriceSale>
              {formatMoney(order.totalPriceProduct + order.shippingPrice - order.totalDiscount)}
            </ProductPriceSale>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
