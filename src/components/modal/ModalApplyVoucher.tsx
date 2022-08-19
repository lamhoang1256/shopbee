import { Button } from "components/button";
import { SectionGray, VoucherItem } from "components/common";
import { Input } from "components/input";
import Modal from "react-modal";

interface ModalApplyVoucherProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalApplyVoucher = ({ isOpen, closeModal }: ModalApplyVoucherProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='Thêm bình luận mới'
      className='max-w-[600px] w-[94%] min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md'
      style={{
        overlay: {
          backgroundColor: "#2424247f",
          zIndex: "100",
        },
      }}
    >
      <div>
        <h2 className='text-xl font-medium'>Chọn Shopbee Voucher</h2>
        <SectionGray className='mt-4 maxsm:p-0'>
          <div className='flex items-center md:gap-2'>
            <span className='hidden md:block'>Mã Voucher</span>
            <Input className='flex-1 maxsm:w-[160px]' placeholder='Mã Voucher Shopbee' />
            <Button onClick={() => {}} className='flex-shrink-0'>
              Áp dụng
            </Button>
          </div>
        </SectionGray>
        <VoucherItem />
        <div className='flex justify-end mt-4 gap-x-2'>
          <Button
            className='w-[140px]'
            onClick={() => {
              closeModal();
            }}
          >
            Trở lại
          </Button>
          <Button primary onClick={() => {}} className='w-[140px]'>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalApplyVoucher;
