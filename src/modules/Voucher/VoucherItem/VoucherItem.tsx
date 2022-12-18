import classNames from "utils/classNames";
import { formatDateVNFull } from "utils/helper";

interface VoucherItemProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  title: string;
  active?: boolean;
  isFreeship: boolean;
  expirationDate: number;
}

const stylesImage = "w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center";
const VoucherItem = ({
  title,
  code,
  isFreeship,
  active = true,
  className,
  expirationDate
}: VoucherItemProps) => {
  const stylesBgFreeship = active ? "bg-[#00bfa5]" : "bg-[#bdbdbd]";
  const stylesBgShopbee = active ? "bg-orangeee4" : "bg-[#bdbdbd]";
  return (
    <div
      className={classNames(
        "flex items-center overflow-hidden bg-white rounded-md gap-x-2 md:gap-x-5 shadow1",
        className
      )}
    >
      {isFreeship ? (
        <div className={classNames(stylesImage, stylesBgFreeship)}>
          <span className="font-medium text-center text-white">MIỄN PHÍ VẬN CHUYỂN</span>
        </div>
      ) : (
        <div className={classNames(stylesImage, stylesBgShopbee)}>
          <img src="/voucher-shopbee.png" className="w-3/5 h-3/5" alt={title} />
          <span className="text-white">Shopbee</span>
        </div>
      )}
      <div
        className={classNames(
          "flex flex-col justify-center flex-1 text-xs md:text-sm",
          !active && "opacity-50"
        )}
      >
        <h3 className="md:text-base">{title}</h3>
        <span>Code: {code}</span>
        {!Number.isNaN(expirationDate) && <span>HSD: {formatDateVNFull(expirationDate)}</span>}
      </div>
    </div>
  );
};

export default VoucherItem;
