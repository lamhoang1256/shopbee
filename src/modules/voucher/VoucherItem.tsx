import { IVoucher } from "@types";
import classNames from "utils/className";
import { formatDateVNFull } from "utils/helper";

interface VoucherItemProps {
  voucher: IVoucher;
  active?: boolean;
}

const VoucherItem = ({ voucher, active }: VoucherItemProps) => {
  return (
    <div className='flex items-center overflow-hidden bg-white rounded-md gap-x-2 md:gap-x-5 shadow1'>
      <div
        className={classNames(
          "w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center",
          active ? "bg-orangeee4" : "bg-[#bdbdbd]",
        )}
      >
        <img src='/images/voucher.png' className='w-3/5 h-3/5' alt='voucher' />
        <span className='text-white'>Shopbee</span>
      </div>
      <div
        className={classNames(
          "flex flex-col justify-center flex-1 text-xs md:text-sm",
          !active && "opacity-50",
        )}
      >
        <h3 className='md:text-base'>{voucher.description}</h3>
        <span>HSD: {formatDateVNFull(Number(voucher.expirationDate) * 1000)}</span>
      </div>
    </div>
  );
};

VoucherItem.defaultProps = {
  active: true,
};

export default VoucherItem;
