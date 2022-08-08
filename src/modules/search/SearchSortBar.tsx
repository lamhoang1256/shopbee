import { Button } from "components/button";
import queryString from "query-string";
import ButtonPagination from "components/button/ButtonPagination";
import { IconNext, IconPrev } from "components/icons";
import { path } from "constants/path";
import { useNavigate } from "react-router-dom";
import { ISearchParams } from "interfaces";
import { useSearchContext } from "./search-context";

const SearchSortBar = () => {
  const { searchPageParams, pagination } = useSearchContext();
  const navigate = useNavigate();
  const handleSearch = (params: any) => {
    const newParams: ISearchParams = {
      ...searchPageParams,
      ...params,
    };
    navigate(`${path.search}?${queryString.stringify(newParams)}`);
  };
  const handleSortByPrice = (e: any) => {
    handleSearch({ order: e.target.value, sort_by: "price" });
  };
  const goNextPage = () => {
    const newPage = Number(searchPageParams.page) + 1;
    handleSearch({ page: newPage });
  };
  const goPrevPage = () => {
    const newPage = Number(searchPageParams.page) - 1;
    handleSearch({ page: newPage });
  };

  return (
    <div className='bg-[#00000008] flex items-center justify-between whitespace-nowrap p-3 overflow-auto gap-x-8'>
      <div className='flex items-center gap-x-3 '>
        <span>Sắp xếp theo</span>
        <Button
          primary
          className='py-0 rounded-sm h-9'
          onClick={() => handleSearch({ sort_by: "view" })}
        >
          Phổ biến
        </Button>
        <Button
          className='py-0 bg-white rounded-sm h-9'
          onClick={() => handleSearch({ sort_by: "createdAt" })}
        >
          Mới nhất
        </Button>
        <Button
          className='py-0 bg-white rounded-sm h-9'
          onClick={() => handleSearch({ sort_by: "sold" })}
        >
          Bán chạy
        </Button>
        <select
          name='sortPrice'
          id='sortPrice'
          className='h-9 py-0 px-2 border border-[#00000017] outline-none'
          onChange={handleSortByPrice}
        >
          <option>Giá</option>
          <option value='asc'>Giá: Thấp đến Cao</option>
          <option value='desc'>Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <div className='mr-3'>
          <span className='text-orangeee4'>{searchPageParams.page || 1}</span>
          <span>/{pagination.pageCount || 1}</span>
        </div>
        <ButtonPagination onClick={goPrevPage} primary={pagination.page > 1}>
          <IconPrev className='w-3 h-3' />
        </ButtonPagination>
        <ButtonPagination
          onClick={goNextPage}
          primary={pagination.pageCount > searchPageParams.page}
        >
          <IconNext className='w-3 h-3' />
        </ButtonPagination>
      </div>
    </div>
  );
};

export default SearchSortBar;
