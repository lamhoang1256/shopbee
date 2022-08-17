import { v4 as uuidv4 } from "uuid";
import { IPagination } from "@types";
import usePagination from "hooks/usePagination";
import { IconNext, IconPrev } from "components/icons";
import ButtonPage from "./ButtonPage";

interface PaginationProps {
  pagination: IPagination;
}

const Pagination = ({ pagination }: PaginationProps) => {
  const { goPrevPage, goNextPage, handleClickNumberPage } = usePagination();

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-2 text-[#00000066] justify-center items-center my-8'>
      <button
        type='button'
        className='cursor-pointer'
        onClick={goPrevPage}
        disabled={pagination.page <= 1}
      >
        <IconPrev />
      </button>
      {Array(pagination.pageCount)
        .fill(0)
        .map((_, index) => (
          <ButtonPage
            key={uuidv4()}
            active={index + 1 === pagination.page}
            onClick={() => handleClickNumberPage(index + 1)}
          >
            {index + 1}
          </ButtonPage>
        ))}
      <button
        type='button'
        className='cursor-pointer'
        onClick={goNextPage}
        disabled={pagination.page >= pagination.pageCount}
      >
        <IconNext />
      </button>
    </div>
  );
};

export default Pagination;
