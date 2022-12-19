import { EnumOrderStatus } from "@types";
import { orderAPI } from "apis";
import Option from "components/Option";
import Select from "components/Select";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";

interface OrderUpdateStatusProps {
  refetch: () => void;
}

const OrderUpdateStatus = ({ refetch }: OrderUpdateStatusProps) => {
  const { id = "" } = useParams();
  const requestUpdateStatusOrder = async (status: string) => {
    if (status === EnumOrderStatus.processing) {
      const { message } = await orderAPI.processingOrder(id);
      toast.success(message);
    }
    if (status === EnumOrderStatus.shipping) {
      const { message } = await orderAPI.shippingOrder(id);
      toast.success(message);
    }
    if (status === EnumOrderStatus.delivered) {
      const { message } = await orderAPI.deliveredOrder(id);
      toast.success(message);
    }
    if (status === EnumOrderStatus.canceled) {
      const payload = { reasonCancel: "Đơn hàng được hủy bởi Shopbee" };
      const { message } = await orderAPI.cancelOrder(id, payload);
      toast.success(message);
    }
  };
  const handleUpdateStatusOrder = async (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    await requestUpdateStatusOrder(status);
    refetch();
  };
  return (
    <div className="mt-3 section-white">
      <div className="flex items-center gap-x-5">
        <span>Trạng thái đơn hàng</span>
        <Select name="status" onChange={handleUpdateStatusOrder}>
          <Option disabled>Trạng thái</Option>
          <Option value={EnumOrderStatus.processing}>Đang xử lí</Option>
          <Option value={EnumOrderStatus.shipping}>Đang vận chuyển</Option>
          <Option value={EnumOrderStatus.delivered}>Đã giao hàng</Option>
          <Option value={EnumOrderStatus.canceled}>Hủy</Option>
        </Select>
      </div>
    </div>
  );
};

export default OrderUpdateStatus;
