import { Button } from "components/button";
import { IconFilter, IconMenu, IconPrev, IconStar } from "components/icons";
import { useRef } from "react";
import { SearchByRating } from "./SearchByRating";

const SearchSidebar = () => {
  const headlineStyles =
    "border-b-2 pb-3 font-semibold text-base border-[#0000000d] text-[#000000cc] flex gap-x-2 items-center";
  const searchSidebarRef = useRef<any>(null);
  const toggleSearchSidebar = () =>
    searchSidebarRef.current && searchSidebarRef.current.classList.toggle("!translate-x-0");

  return (
    <>
      <Button onClick={() => toggleSearchSidebar()} className='lg:hidden'>
        Bộ lọc
      </Button>
      <div
        className='-translate-x-full lg:w-48 z-10 w-full fixed inset-0 lg:translate-x-0 bg-[#f5f5f5] min-h-screen p-4 lg:p-0 transition-all duration-300 lg:static overflow-auto'
        ref={searchSidebarRef}
      >
        <div className='max-w-[192px]'>
          <div>
            <div
              className='flex items-center mb-5 cursor-pointer gap-x-2 lg:hidden'
              aria-hidden='true'
              onClick={() => toggleSearchSidebar()}
            >
              <IconPrev className='w-4 h-4' />
              <span className='text-base font-medium'>Trở lại</span>
            </div>
            <div className={headlineStyles}>
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
            <div className={headlineStyles}>
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
            <div className={headlineStyles}>
              <IconStar />
              <span>Đánh giá</span>
            </div>
            <div className='mt-3'>
              <SearchByRating />
            </div>
            <div className='border-t-2 pb-3 mt-6 border-[#0000000d]'>
              <Button primary className='w-full py-[6px] mt-4 rounded-sm'>
                XÓA TẤT CẢ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
