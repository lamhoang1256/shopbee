import { Button } from "components/button";
import { IconFilter } from "components/icons";

const SearchRangePrice = () => {
  return (
    <div className='mt-5'>
      <div className='search-catelog-header'>
        <IconFilter />
        <h3>Bộ lọc tìm kiếm</h3>
      </div>
      <div className='mt-3'>
        <span className='text-[#000000cc]'>Khoản giá</span>
        <div className='flex items-center justify-between mt-2'>
          <input
            className='outline-none h-8 px-1 w-[85px] bg-white border border-[#00000024]'
            name='low'
            placeholder='Từ'
          />
          <span>-</span>
          <input
            className='outline-none h-8 w-[85px] px-1 bg-white border border-[#00000024]'
            name='high'
            placeholder='Đến'
          />
        </div>
        <Button primary className='w-full py-[6px] mt-4 rounded-sm'>
          ÁP DỤNG
        </Button>
      </div>
    </div>
  );
};

export default SearchRangePrice;
