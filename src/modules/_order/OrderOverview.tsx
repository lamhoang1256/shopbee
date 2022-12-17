import { IOrder } from "@types";
import { formatDateVNFull } from "utils/helper";

interface OrderOverviewProps {
  order: IOrder;
}

const OrderOverview = ({ order }: OrderOverviewProps) => {
  return (
    <>
      <div className="mt-6 md:mt-14 gradient-line" />
      <div className="grid grid-cols-1 pt-5 text-xs md:text-sm gap-x-6 gap-y-3 lg:grid-cols-2">
        <div>
          <h3 className="mb-1 text-lg">Chi tiết đơn hàng</h3>
          <p>Mã đơn hàng: {order?._id}</p>
          <p>Đặt lúc: {formatDateVNFull(order?.createdAt)}</p>
          <p>
            Phương thức thanh toán:{" "}
            {order.methodPayment === "money" ? "Thanh toán khi nhận hàng" : "Thẻ Tín Dụng/Ghi Nợ"}
          </p>
          <p>Địa chỉ shop: {order?.shippingFrom}</p>
        </div>
        <div>
          <h3 className="mb-1 text-lg">Thông tin nhận hàng</h3>
          <p>Người nhận: {order?.user?.fullname}</p>
          <p>Email: {order?.user?.email}</p>
          <p>Địa chỉ nhận hàng: {order?.shippingTo}</p>
          {order.note && <p>Lời nhắn: {order.note}</p>}
        </div>
      </div>
    </>
  );
};

export default OrderOverview;
