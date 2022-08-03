import { Button } from "components/button";
import { path } from "constants/path";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchByCategory from "./SearchByCategory";
import SearchByRating from "./SearchByRating";
import SearchCloseSidebar from "./SearchCloseSidebar";
import SearchRangePrice from "./SearchRangePrice";

const SearchSidebar = () => {
  const navigate = useNavigate();
  const searchSidebarRef = useRef<HTMLDivElement>(null);
  const toggleSearchSidebar = () =>
    searchSidebarRef.current && searchSidebarRef.current.classList.toggle("!translate-x-0");

  return (
    <>
      <Button onClick={() => toggleSearchSidebar()} className='lg:hidden'>
        Bộ lọc
      </Button>
      <div className='search-sidebar' ref={searchSidebarRef}>
        <div className='max-w-[192px]'>
          <SearchCloseSidebar onCloseSidebar={toggleSearchSidebar} />
          <SearchByCategory />
          <SearchRangePrice />
          <SearchByRating />
          <div className='border-t-2 pb-3 mt-6 border-[#0000000d]'>
            <Button
              primary
              className='w-full py-[6px] mt-4 rounded-sm'
              onClick={() => navigate(path.search)}
            >
              XÓA TẤT CẢ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
