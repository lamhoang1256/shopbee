import { IVoucher } from "@types";
import { voucherAPI } from "apis";
import Button from "components/Button";
import Input from "components/Input";
import VoucherEmpty from "modules/Voucher/VoucherEmpty";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "react-modal";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { formatDateVNFull } from "utils";

interface ModalApplyVoucherProps {
  isShow: boolean;
  closeModal: () => void;
  appliedVoucher: IVoucher;
  setAppliedVoucher: Dispatch<SetStateAction<IVoucher>>;
}

const ModalApplyVoucher = ({
  isShow,
  closeModal,
  appliedVoucher,
  setAppliedVoucher
}: ModalApplyVoucherProps) => {
  const { currentUser } = useStore((state) => state);
  const [voucherCode, setVoucherCode] = useState("");
  const saveVoucherMutation = useMutation({
    mutationFn: (code: string) => voucherAPI.saveVoucher(code),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError(error: any) {
      toast.error(error?.message);
    }
  });
  const handleSaveVoucher = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!voucherCode) return;
    if (!currentUser || !currentUser._id) {
      toast.error("Vui lòng đăng nhập để lưu voucher");
      return;
    }
    saveVoucherMutation.mutate(voucherCode);
  };
  const { data: myVouchersData } = useQuery({
    queryKey: ["myVouchers"],
    queryFn: () => voucherAPI.getMyVoucher(),
    staleTime: 5 * 60 * 1000
  });
  return (
    <Modal
      isOpen={isShow}
      onRequestClose={closeModal}
      contentLabel="Áp dụng voucher"
      className="stylesModal"
      style={{ overlay: { backgroundColor: "#2424247f", zIndex: "1000" } }}
    >
      <h2 className="text-xl font-medium">Chọn Shopbee Voucher</h2>
      <div className="mt-4 section-gray maxsm:p-0">
        <form
          autoComplete="off"
          onSubmit={handleSaveVoucher}
          className="flex items-center md:gap-2"
        >
          <span className="hidden md:block">Mã Voucher</span>
          <Input
            required
            value={voucherCode}
            className="flex-1 maxsm:w-[160px]"
            placeholder="Mã Voucher Shopbee"
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <Button type="submit" className="flex-shrink-0">
            Áp dụng
          </Button>
        </form>
      </div>
      <div className="overflow-y-auto max-h-72">
        {myVouchersData && myVouchersData?.data.length === 0 ? (
          <VoucherEmpty />
        ) : (
          myVouchersData?.data.map((voucher) => (
            <div
              key={voucher._id}
              className="flex items-center mx-[2px] my-4 overflow-hidden rounded-md gap-x-2 md:gap-x-5 shadow1"
            >
              {voucher.isFreeship ? (
                <div className="bg-[#00bfa5] w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center">
                  <span className="font-medium text-center text-white">MIỄN PHÍ VẬN CHUYỂN</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-orangeee4 sm:w-28 sm:h-28">
                  <img className="w-3/5 h-3/5" alt={voucher.title} src="/voucher-shopbee.png" />
                  <span className="text-white">Shopbee</span>
                </div>
              )}
              <div className="flex flex-col justify-center flex-1 text-xs md:text-sm">
                <h3 className="text-sm md:text-base line-clamp-1">{voucher.title}</h3>
                <span>Code: {voucher.code}</span>
                <span>HSD: {formatDateVNFull(voucher.expirationDate)}</span>
              </div>
              <div className="pr-2 md:pr-4">
                <input
                  type="checkbox"
                  value={voucher.code}
                  className="w-5 h-5"
                  onChange={() => setAppliedVoucher(voucher)}
                  checked={voucher.code === appliedVoucher.code}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end mt-4 gap-x-2">
        <Button className="w-[140px]" onClick={closeModal}>
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
