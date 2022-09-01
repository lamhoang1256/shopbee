import { orderAPI } from "apis";
import { Button } from "components/button";
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
      const { message } = await orderAPI.cancelOrder(id, { reasonCancel });
      setReasonCancel("");
      fetchDetailsOrder();
      toast.success(message);
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='Hủy đơn hàng'
      className='max-w-[600px] w-full min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md'
      style={{ overlay: { backgroundColor: "#2424247f", zIndex: "100" } }}
    >
      <div>
        <h2 className='mt-4 text-lg font-semibold text-center'>
          Vui lòng cho Shopbee biết lý do bạn hủy đơn
        </h2>
        <textarea
          rows={5}
          value={reasonCancel}
          onChange={(e) => setReasonCancel(e.target.value)}
          placeholder='Hãy chia sẻ lý do bạn muốn hủy đơn hàng này nhé.'
          className='border-[#00000024] focus:border-[#0000008a] border mt-6 p-3 w-full outline-none resize-none rounded'
        />
      </div>
      <div className='flex mt-4 gap-x-2'>
        <Button
          className='w-full'
          onClick={() => {
            closeModal();
            setReasonCancel("");
          }}
        >
          Trở về
        </Button>
        <Button primary className='w-full' onClick={handleCancelOrder}>
          Hủy đơn hàng
        </Button>
      </div>
    </Modal>
  );
};

export default ModalCancelOrder;
