import { OrderStatusCode } from "@types";

export const renderStatusOrder = (statusCode: number) => {
  switch (statusCode) {
    case OrderStatusCode.processing:
      return "Đang xử lí";
    case OrderStatusCode.shipping:
      return "Đang giao hàng";
    case OrderStatusCode.delivered:
      return "Đã giao hàng";
    case OrderStatusCode.canceled:
      return "Đã hủy";
    default:
      return "Đang chờ";
  }
};
