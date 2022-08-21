import { IVoucher } from "@types";
import { formatDateVNFull } from "utils/helper";

interface VoucherApplyItemProps {
  voucher: IVoucher;
  appliedVoucher: IVoucher;
  setAppliedVoucher: React.Dispatch<React.SetStateAction<IVoucher>>;
}

const VoucherApplyItem = ({
  voucher,
  appliedVoucher,
  setAppliedVoucher,
}: VoucherApplyItemProps) => {
  return (
    <div className='flex items-center my-4 overflow-hidden rounded-md gap-x-2 md:gap-x-5 shadow1'>
      <div className='w-[70px] h-[70px] md:w-24 md:h-24 bg-orangeee4 flex items-center justify-center'>
        <img src='/images/voucher.png' className='w-3/5 h-3/5' alt='voucher' />
      </div>
      <div className='flex flex-col justify-center flex-1 text-xs md:text-sm'>
        <h3 className='md:text-base'>{voucher.title}</h3>
        <span>HSD: {formatDateVNFull(Number(voucher.expirationDate) * 1000)}</span>
      </div>
      <div className='pr-2 md:pr-4'>
        <input
          checked={voucher.code === appliedVoucher.code}
          value={voucher.code}
          type='checkbox'
          className='w-5 h-5'
          onChange={() => setAppliedVoucher(voucher)}
        />
      </div>
    </div>
  );
};

export default VoucherApplyItem;
