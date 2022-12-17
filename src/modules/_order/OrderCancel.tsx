import { OrderStatus } from "@types";
import Button from "components/Button";
import { ModalCancelOrder } from "components/Modal";
import useModal from "hooks/useModal";

interface OrderCancelProps {
  status: OrderStatus;
  fetchDetailsOrder: () => void;
}

const OrderCancel = ({ status, fetchDetailsOrder }: OrderCancelProps) => {
  const { isShow, toggleModal } = useModal();
  const isCanceled = status !== OrderStatus.delivered && status !== OrderStatus.canceled;
  return (
    <div className="bg-[#fafdff] p-4 flex gap-y-3 md:justify-between flex-col md:flex-row border-dotted border-[#00000017] shadow2 border -mx-[1px]">
      <span className="leading-10 text-xs text-[#0000008a]">
        Cảm ơn bạn đã mua sắm tại Shopbee!
      </span>
      {isCanceled && (
        <Button primary onClick={toggleModal}>
          Hủy đơn hàng
        </Button>
      )}
      <ModalCancelOrder
        isOpen={isShow}
        closeModal={toggleModal}
        fetchDetailsOrder={fetchDetailsOrder}
      />
    </div>
  );
};

export default OrderCancel;
