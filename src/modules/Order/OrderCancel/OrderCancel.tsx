import { EnumOrderStatus } from "@types";
import { orderAPI } from "apis";
import Button from "components/Button";
import Textarea from "components/Textarea";
import useModal from "hooks/useModal";
import { useState } from "react";
import Modal from "react-modal";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface OrderCancelProps {
  status: EnumOrderStatus;
  refetch: () => void;
}

const OrderCancel = ({ status, refetch }: OrderCancelProps) => {
  const { id = "" } = useParams();
  const { isShow, toggleModal } = useModal();
  const [reasonCancel, setReasonCancel] = useState("");
  const cancelOrderMutation = useMutation({
    mutationFn: () => orderAPI.cancelOrder(id, { reasonCancel }),
    onSuccess({ message }) {
      setReasonCancel("");
      toast.success(message);
      toggleModal();
      refetch();
    },
    onError(error: any) {
      toast.error(error?.message);
    }
  });
  const handleCancelOrder = () => {
    if (!reasonCancel) {
      toast.error("Vui lòng nhập lí do hủy đơn hàng");
      return;
    }
    cancelOrderMutation.mutate();
  };
  const isCanceled = status !== EnumOrderStatus.delivered && status !== EnumOrderStatus.canceled;
  return (
    <div className="bg-[#fafdff] p-4 flex gap-y-3 md:justify-between flex-col md:flex-row border-dotted border-black017 shadow2 border -mx-[1px]">
      <span className="leading-10 text-xs text-[#0000008a]">
        Cảm ơn bạn đã mua sắm tại Shopbee!
      </span>
      {isCanceled && (
        <Button primary onClick={toggleModal}>
          Hủy đơn hàng
        </Button>
      )}
      <Modal
        isOpen={isShow}
        onRequestClose={toggleModal}
        contentLabel="Hủy đơn hàng"
        className="stylesModal"
        style={{ overlay: { backgroundColor: "#2424247f", zIndex: "1000" } }}
      >
        <div>
          <h2 className="mt-4 text-lg font-semibold text-center">
            Vui lòng cho Shopbee biết lý do bạn hủy đơn
          </h2>
          <Textarea
            value={reasonCancel}
            onChange={(e) => setReasonCancel(e.target.value)}
            placeholder="Hãy chia sẻ lý do bạn muốn hủy đơn hàng này nhé."
          />
        </div>
        <div className="flex mt-4 gap-x-2">
          <Button
            className="w-full"
            onClick={() => {
              toggleModal();
              setReasonCancel("");
            }}
          >
            Trở về
          </Button>
          <Button primary className="w-full" onClick={handleCancelOrder}>
            Hủy đơn hàng
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderCancel;
