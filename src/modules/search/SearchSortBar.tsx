import { IPagination } from "@types";
import { Button } from "components/button";
import ButtonPagination from "components/button/ButtonPagination";
import { IconNext, IconPrev } from "components/icons";
import usePagination from "hooks/usePagination";
import { useSearchParams } from "react-router-dom";

interface SearchSortBarProps {
  pagination: IPagination;
}

const SearchSortBar = ({ pagination }: SearchSortBarProps) => {
  const { handleFilter, goNextPage, goPrevPage } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);
  const currentPage = Number(searchParams.get("page"));
  const sortBy = searchParams.get("sort_by");
  const handleSortByPrice = (e: any) => {
    handleFilter({ order: e.target.value, sort_by: "price" });
  };

  return (
    <div className='bg-[#00000008] flex items-center justify-between whitespace-nowrap p-3 overflow-auto gap-x-8'>
      <div className='flex items-center gap-x-3 '>
        <span>Sắp xếp theo</span>
        <Button
          primary={sortBy === "view" || sortBy === null}
          className='py-0 rounded-sm h-9'
          onClick={() => setSearchParams({ ...currentParams, sort_by: "view" })}
        >
          Phổ biến
        </Button>
        <Button
          primary={sortBy === "createdAt"}
          className='py-0 rounded-sm h-9'
          onClick={() => setSearchParams({ ...currentParams, sort_by: "createdAt" })}
        >
          Mới nhất
        </Button>
        <Button
          primary={sortBy === "sold"}
          className='py-0 rounded-sm h-9'
          onClick={() => setSearchParams({ ...currentParams, sort_by: "sold" })}
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
          <span className='text-orangeee4'>{currentPage || 1}</span>
          <span>/{pagination.pageCount || 1}</span>
        </div>
        <ButtonPagination onClick={goPrevPage} primary={pagination.page > 1}>
          <IconPrev className='w-3 h-3' />
        </ButtonPagination>
        <ButtonPagination onClick={goNextPage} primary={pagination.pageCount > currentPage}>
          <IconNext className='w-3 h-3' />
        </ButtonPagination>
      </div>
    </div>
  );
};

export default SearchSortBar;
