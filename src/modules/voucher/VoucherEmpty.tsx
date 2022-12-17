import { Link } from "react-router-dom";
import { PATH } from "constants/path";

const VoucherEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 mt-3 bg-white gap-y-1">
      <img src="/voucher-empty.png" alt="empty voucher" className="w-24 h-24" />
      <h3 className="font-medium -mt-3 text-base text-[#00000066]">Không có voucher phù hợp</h3>
      <Link to={PATH.home}>
        <button type="button" className="px-4 py-2 mt-2 text-white rounded bg-orangeee4">
          Tìm thêm voucher
        </button>
      </Link>
    </div>
  );
};

export default VoucherEmpty;
