import { IPagination } from "@types";
import Button from "components/Button";
import { IconNext, IconPrev } from "components/Icons";
import Option from "components/Option";
import { PaginationButton } from "components/Pagination";
import Select from "components/Select";
import usePagination from "hooks/usePagination";
import useQueryParams from "hooks/useQueryParams";
import { ChangeEvent } from "react";

interface SearchSortBarProps {
  pagination: IPagination;
}

const SearchSortBar = ({ pagination }: SearchSortBarProps) => {
  const { queryParams, setSearchParams } = useQueryParams();
  const page = Number(queryParams?.page) || 1;
  const sortBy = queryParams?.sort_by || "";
  const { handleFilter, goNextPage, goPrevPage } = usePagination();
  const handleSortByPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    handleFilter({ order: e.target.value, sort_by: "price" });
  };
  return (
    <div className="bg-[#00000008] flex items-center justify-between whitespace-nowrap p-3 overflow-auto gap-x-8">
      <div className="flex items-center gap-x-3 ">
        <span>Sắp xếp theo</span>
        <Button
          className="py-0 rounded-sm h-9"
          primary={sortBy === "view" || sortBy === null}
          onClick={() => setSearchParams({ ...queryParams, sort_by: "view" })}
        >
          Phổ biến
        </Button>
        <Button
          className="py-0 rounded-sm h-9"
          primary={sortBy === "createdAt"}
          onClick={() => setSearchParams({ ...queryParams, sort_by: "createdAt" })}
        >
          Mới nhất
        </Button>
        <Button
          className="py-0 rounded-sm h-9"
          primary={sortBy === "sold"}
          onClick={() => setSearchParams({ ...queryParams, sort_by: "sold" })}
        >
          Bán chạy
        </Button>
        <Select
          id="sortPrice"
          name="sortPrice"
          className="h-9 py-0 px-2 border border-black017 outline-none"
          onChange={handleSortByPrice}
        >
          <Option disabled>Giá</Option>
          <Option value="asc">Giá: Thấp đến Cao</Option>
          <Option value="desc">Giá: Cao đến Thấp</Option>
        </Select>
      </div>
      <div className="flex items-center">
        <div className="mr-3">
          <span className="text-orangeee4">{page}</span>
          <span>/{pagination.totalPage}</span>
        </div>
        <PaginationButton onClick={goPrevPage} primary={pagination.page > 1}>
          <IconPrev className="w-3 h-3" />
        </PaginationButton>
        <PaginationButton onClick={goNextPage} primary={pagination.totalPage > page}>
          <IconNext className="w-3 h-3" />
        </PaginationButton>
      </div>
    </div>
  );
};

export default SearchSortBar;
