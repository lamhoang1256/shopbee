import { OrderStatusCodeEnum } from "@types";
import { Button } from "components/button";
import { ModalCancelOrder } from "components/modal";
import { useState } from "react";

interface OrderCancelProps {
  statusCode: OrderStatusCodeEnum;
  fetchDetailsOrder: () => void;
}

const OrderCancel = ({ statusCode, fetchDetailsOrder }: OrderCancelProps) => {
  const [showModalCancel, setShowModalCancel] = useState(false);
  const openModalCancel = () => {
    setShowModalCancel(true);
  };
  const closeModalCancel = () => {
    setShowModalCancel(false);
  };

  return (
    <div className='bg-[#fafdff] p-3 flex gap-y-3 md:justify-between flex-col md:flex-row border-dotted border border-[#00000017]'>
      <span className='leading-10 text-xs text-[#0000008a]'>
        Cảm ơn bạn đã mua sắm tại Shopbee!
      </span>
      <div className='flex flex-wrap gap-2'>
        {statusCode !== OrderStatusCodeEnum.delivered &&
          statusCode !== OrderStatusCodeEnum.canceled && (
            <Button primary onClick={openModalCancel}>
              Hủy đơn hàng
            </Button>
          )}
      </div>
      <ModalCancelOrder
        isOpen={showModalCancel}
        closeModal={closeModalCancel}
        fetchDetailsOrder={fetchDetailsOrder}
      />
    </div>
  );
};

export default OrderCancel;
