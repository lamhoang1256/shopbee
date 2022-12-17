import { IVoucher } from "@types";
import { voucherAPI } from "apis";
import Button from "components/Button";
import Input from "components/Input";
import { VoucherApplyItem, VoucherEmpty } from "modules/_voucher";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

interface ModalApplyVoucherProps {
  isOpen: boolean;
  closeModal: () => void;
  appliedVoucher: IVoucher;
  setAppliedVoucher: React.Dispatch<React.SetStateAction<IVoucher>>;
}

const ModalApplyVoucher = ({
  isOpen,
  closeModal,
  appliedVoucher,
  setAppliedVoucher
}: ModalApplyVoucherProps) => {
  const [newVoucher, setNewVoucher] = useState("");
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const fetchMyVoucher = async () => {
    try {
      const { data } = await voucherAPI.getMyVoucher();
      setVouchers(data.reverse());
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleSaveVoucher = async () => {
    try {
      const { message } = await voucherAPI.saveVoucher(newVoucher);
      toast.success(message);
      fetchMyVoucher();
    } catch (error) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchMyVoucher();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Áp dụng voucher"
      className="max-w-[600px] w-[94%] min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md"
      style={{ overlay: { backgroundColor: "#2424247f", zIndex: "1000" } }}
    >
      <h2 className="text-xl font-medium">Chọn Shopbee Voucher</h2>
      <div className="mt-4 section-gray maxsm:p-0">
        <div className="flex items-center md:gap-2">
          <span className="hidden md:block">Mã Voucher</span>
          <Input
            value={newVoucher}
            className="flex-1 maxsm:w-[160px]"
            placeholder="Mã Voucher Shopbee"
            onChange={(e) => setNewVoucher(e.target.value)}
          />
          <Button onClick={handleSaveVoucher} className="flex-shrink-0">
            Áp dụng
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-72">
        {vouchers.length === 0 && <VoucherEmpty />}
        {vouchers.length > 0 &&
          vouchers.map((voucher) => (
            <VoucherApplyItem
              key={voucher._id}
              appliedVoucher={appliedVoucher}
              voucher={voucher}
              setAppliedVoucher={setAppliedVoucher}
            />
          ))}
      </div>
      <div className="flex justify-end mt-4 gap-x-2">
        <Button
          className="w-[140px]"
          onClick={() => {
            closeModal();
            setAppliedVoucher({} as IVoucher);
          }}
        >
          Trở lại
        </Button>
        <Button primary onClick={closeModal} className="w-[140px]">
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default ModalApplyVoucher;
