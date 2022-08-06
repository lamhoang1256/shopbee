import { IOrder } from "interfaces";

interface OrderOverviewProps {
  order: IOrder;
}

const OrderOverview = ({ order }: OrderOverviewProps) => {
  return (
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
  );
};

export default OrderOverview;
