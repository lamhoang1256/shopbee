import { voucherAPI } from "apis";
import { Input } from "components/input";
import { useState } from "react";
import { toast } from "react-toastify";
import classNames from "utils/classNames";

interface VoucherSaveProps {
  fetchReloadVoucher: () => void;
}

const VoucherSave = ({ fetchReloadVoucher }: VoucherSaveProps) => {
  const [newVoucher, setNewVoucher] = useState("");
  const handleSaveVoucher = async () => {
    try {
      const { message } = await voucherAPI.saveVoucher(newVoucher);
      fetchReloadVoucher();
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="maxsm:p-0 bg-[#00000008] py-7">
      <div className="flex items-center md:gap-3 mx-auto max-w-[620px]">
        <span className="hidden md:block">Mã Voucher</span>
        <Input
          value={newVoucher}
          className="flex-1 maxsm:w-[160px] !h-11"
          placeholder="Nhập mã voucher tại đây"
          onChange={(e) => setNewVoucher(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSaveVoucher}
          className={classNames(
            "flex-shrink-0 w-16 sm:w-20  text-white rounded-sm h-11",
            newVoucher ? "bg-orangeee4" : "bg-[#0000001a]"
          )}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default VoucherSave;
