import { formatDateVNFull } from "utils/helper";

interface VoucherItemProps {
  description: string;
  expirationDate: string;
}

const VoucherItem = ({ description, expirationDate }: VoucherItemProps) => {
  return (
    <div className='flex my-4 overflow-hidden rounded-md gap-x-5 shadow1'>
      <div className='w-[70px] h-[70px] md:w-24 md:h-24 bg-orangeee4 flex items-center justify-center'>
        <img src='/images/voucher.png' className='w-3/5 h-3/5' alt='voucher' />
      </div>
      <div className='flex flex-col justify-center'>
        <h3 className='text-base'>{description}</h3>
        <span>HSD: {formatDateVNFull(Number(expirationDate) * 1000)}</span>
      </div>
    </div>
  );
};

export default VoucherItem;
