import { IOrderDetails } from "@types";
import { formatDateVNFull } from "utils";

interface OrderInfomationProps {
  orderDetails: IOrderDetails;
}

const OrderInfomation = ({ orderDetails }: OrderInfomationProps) => {
  return (
    <>
      <div className="mt-6 md:mt-14 gradient-line" />
      <div className="grid grid-cols-1 pt-5 text-xs md:text-sm gap-x-6 gap-y-3 lg:grid-cols-2">
        <div>
          <h3 className="mb-1 text-lg">Chi tiết đơn hàng</h3>
          <p>Mã đơn hàng: {orderDetails?._id}</p>
          <p>Đặt lúc: {formatDateVNFull(orderDetails?.createdAt)}</p>
          <p>
            Phương thức thanh toán:{" "}
            {orderDetails.methodPayment === "money"
              ? "Thanh toán khi nhận hàng"
              : "Thẻ Tín Dụng/Ghi Nợ"}
          </p>
          <p>Địa chỉ shop: {orderDetails?.shippingFrom}</p>
        </div>
        <div>
          <h3 className="mb-1 text-lg">Thông tin nhận hàng</h3>
          <p>Người nhận: {orderDetails?.user?.fullname}</p>
          <p>Email: {orderDetails?.user?.email}</p>
          <p>Địa chỉ nhận hàng: {orderDetails?.shippingTo}</p>
          {orderDetails.note && <p>Lời nhắn: {orderDetails.note}</p>}
        </div>
      </div>
    </>
  );
};

export default OrderInfomation;
