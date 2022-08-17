import { OrderStatusCodeEnum } from "@types";

export const renderStatusOrder = (statusCode: number) => {
  switch (statusCode) {
    case OrderStatusCodeEnum.processing:
      return "Đang xử lí";
    case OrderStatusCodeEnum.shipping:
      return "Đang giao hàng";
    case OrderStatusCodeEnum.delivered:
      return "Đã giao hàng";
    case OrderStatusCodeEnum.canceled:
      return "Đã hủy";
    default:
      return "Đang chờ";
  }
};
