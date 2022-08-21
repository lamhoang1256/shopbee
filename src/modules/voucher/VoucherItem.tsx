import classNames from "utils/className";
import { formatDateVNFull } from "utils/helper";

interface VoucherItemProps {
  title: string;
  expirationDate: number;
  active?: boolean;
  className?: string;
}

const VoucherItem = ({ title, active, className, expirationDate }: VoucherItemProps) => {
  return (
    <div
      className={classNames(
        "flex items-center overflow-hidden bg-white rounded-md gap-x-2 md:gap-x-5 shadow1",
        className,
      )}
    >
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
        <h3 className='md:text-base'>{title}</h3>
        {expirationDate !== 0 && <span>HSD: {formatDateVNFull(expirationDate)}</span>}
      </div>
    </div>
  );
};

VoucherItem.defaultProps = {
  active: true,
  className: "",
};

export default VoucherItem;
