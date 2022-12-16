import { orderAPI } from "apis";
import Button from "components/Button";
import { Textarea } from "components/textarea";
import { useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalCancelOrderProps {
  isOpen: boolean;
  closeModal: () => void;
  fetchDetailsOrder: () => void;
}

const ModalCancelOrder = ({ isOpen, closeModal, fetchDetailsOrder }: ModalCancelOrderProps) => {
  const { id = "" } = useParams();
  const [reasonCancel, setReasonCancel] = useState("");
  const handleCancelOrder = async () => {
    try {
      if (!reasonCancel) {
        toast.error("Vui lòng nhập lí do hủy đơn hàng");
        return;
      }
      const { message } = await orderAPI.cancelOrder(id, { reasonCancel });
      setReasonCancel("");
      fetchDetailsOrder();
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Hủy đơn hàng"
      className="max-w-[600px] w-full min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md"
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
            closeModal();
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
  );
};

export default ModalCancelOrder;
