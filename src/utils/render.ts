import { IOrderStatusCode } from "@types";

export const renderStatusOrder = (statusCode: number) => {
  switch (statusCode) {
    case IOrderStatusCode.processing:
      return "Đang xử lí";
    case IOrderStatusCode.shipping:
      return "Đang giao hàng";
    case IOrderStatusCode.delivered:
      return "Đã giao hàng";
    case IOrderStatusCode.canceled:
      return "Đã hủy";
    default:
      return "Đang chờ";
  }
};
