import { Button } from "components/button";
import { path } from "constants/path";
import { Sidebar } from "layouts";
import { useNavigate } from "react-router-dom";
import SearchByCategory from "./SearchByCategory";
import SearchByRating from "./SearchByRating";
import SearchRangePrice from "./SearchRangePrice";

const SearchSidebar = () => {
  const navigate = useNavigate();
  return (
    <Sidebar labelOpenSidebar='Bộ lọc'>
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
    </Sidebar>
  );
};

export default SearchSidebar;
