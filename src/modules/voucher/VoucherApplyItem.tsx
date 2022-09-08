import { IVoucher } from "@types";
import { SetStateAction, Dispatch } from "react";
import { formatDateVNFull } from "utils/helper";

interface VoucherApplyItemProps {
  voucher: IVoucher;
  appliedVoucher: IVoucher;
  setAppliedVoucher: Dispatch<SetStateAction<IVoucher>>;
}

const VoucherApplyItem = ({
  voucher,
  appliedVoucher,
  setAppliedVoucher,
}: VoucherApplyItemProps) => {
  return (
    <div className='flex items-center mx-[2px] my-4 overflow-hidden rounded-md gap-x-2 md:gap-x-5 shadow1'>
      {voucher.isFreeship ? (
        <div className='bg-[#00bfa5] w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center'>
          <span className='font-medium text-center text-white'>MIỄN PHÍ VẬN CHUYỂN</span>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center w-20 h-20 bg-orangeee4 sm:w-28 sm:h-28'>
          <img src='/images/voucher-shopbee.png' className='w-3/5 h-3/5' alt='voucher' />
          <span className='text-white'>Shopbee</span>
        </div>
      )}
      <div className='flex flex-col justify-center flex-1 text-xs md:text-sm'>
        <h3 className='text-sm md:text-base line-clamp-1'>{voucher.title}</h3>
        <span>Code: {voucher.code}</span>
        <span>HSD: {formatDateVNFull(voucher.expirationDate)}</span>
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
