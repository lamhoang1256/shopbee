import { Button } from "components/button";
import { IconFilter, IconMenu, IconStar } from "components/icons";
import classNames from "utils/className";

export const renderRating = (score: number) => {
  return [1, 2, 3, 4, 5].map((item) => {
    if (item <= score) {
      return <IconStar key={item} className={classNames("text-[#ffce3d] w-5 h-5")} />;
    }
    return <IconStar key={item} className={classNames("text-[#d5d5d5] w-5 h-5")} />;
  });
};

const FilterSidebar = () => {
  return (
    <div className='lg:w-48'>
      <div>
        <div className='border-b-2 pb-3 font-semibold text-base border-[#0000000d] text-[#000000cc] flex gap-x-2 items-center'>
          <IconMenu />
          <h3>Tất cả danh mục</h3>
        </div>
        <ul className='mt-2'>
          <li className='px-3 py-[6px]'>
            <a href='!#' className='text-[#000000cc] line-clamp-1'>
              Áo thun
            </a>
          </li>
          <li className='px-3 py-[6px]'>
            <a href='!#' className='text-[#000000cc] line-clamp-1'>
              Áo thun
            </a>
          </li>
          <li className='px-3 py-[6px]'>
            <a href='!#' className='text-[#000000cc] line-clamp-1'>
              Áo thun
            </a>
          </li>
        </ul>
      </div>
      <div className='mt-5'>
        <div className='border-b-2 pb-3 font-semibold text-base border-[#0000000d] text-[#000000cc] flex gap-x-2 items-center'>
          <IconFilter />
          <h3>Bộ lọc tìm kiếm</h3>
        </div>
        <div className='mt-3'>
          <span className='text-[#000000cc]'>Khoản giá</span>
          <div className='flex items-center justify-between mt-2'>
            <input
              className='outline-none h-8 px-1 w-20 bg-white border border-[#00000024]'
              name='low'
              placeholder='Từ'
            />
            <span>-</span>
            <input
              className='outline-none h-8 w-20 px-1 bg-white border border-[#00000024]'
              name='high'
              placeholder='Đến'
            />
          </div>
          <Button primary className='w-full py-[6px] mt-4 rounded-sm'>
            ÁP DỤNG
          </Button>
        </div>
      </div>
      <div className='mt-6'>
        <div className='border-b-2 pb-3 font-semibold text-base border-[#0000000d] text-[#000000cc] flex gap-x-2 items-center'>
          <IconStar />
          <span>Đánh giá</span>
        </div>
        <div className='mt-3'>
          <div className='flex mt-2'>{renderRating(5)}</div>
          <div className='flex mt-2'>
            {renderRating(4)}
            <span className='text-[#000000cc] ml-2'>Trở lên</span>
          </div>
          <div className='flex mt-2'>
            {renderRating(3)}
            <span className='text-[#000000cc] ml-2'>Trở lên</span>
          </div>
          <div className='flex mt-2'>
            {renderRating(2)}
            <span className='text-[#000000cc] ml-2'>Trở lên</span>
          </div>
          <div className='flex mt-2'>
            {renderRating(1)}
            <span className='text-[#000000cc] ml-2'>Trở lên</span>
          </div>
        </div>
        <div className='border-t-2 pb-3 mt-6 border-[#0000000d]'>
          <Button primary className='w-full py-[6px] mt-4 rounded-sm'>
            XÓA TẤT CẢ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
