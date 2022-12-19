import { IPagination } from "@types";
import { IconNext, IconPrev } from "components/Icons";
import usePagination from "hooks/usePagination";
import PaginationNumber from "./PaginationNumber";

interface PaginationProps {
  pagination: IPagination;
}

const RANGE = 2;
const Pagination = ({ pagination }: PaginationProps) => {
  const { goPrevPage, goNextPage, handleClickNumberPage } = usePagination();
  const page = Number(pagination.page);
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span key={index} className="text-xl">
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span key={index} className="text-xl">
            ...
          </span>
        );
      }
      return null;
    };
    return Array(pagination.totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        // Điều kiện để return về ...
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pagination.totalPage - RANGE + 1
        ) {
          return renderDotAfter(index);
        }
        if (page > RANGE * 2 + 1 && page < pagination.totalPage - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          }
          if (pageNumber > page + RANGE && pageNumber < pagination.totalPage - RANGE + 1) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pagination.totalPage - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <PaginationNumber
            key={pageNumber}
            active={pageNumber === pagination.page}
            onClick={() => handleClickNumberPage(pageNumber)}
          >
            {pageNumber}
          </PaginationNumber>
        );
      });
  };
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2 text-[#00000066] justify-center items-center my-8">
      <button
        type="button"
        className="cursor-pointer disabled:cursor-not-allowed"
        onClick={goPrevPage}
        disabled={pagination.page <= 1}
      >
        <IconPrev />
      </button>
      {renderPagination()}
      <button
        type="button"
        className="cursor-pointer disabled:cursor-not-allowed"
        onClick={goNextPage}
        disabled={pagination.page >= pagination.totalPage}
      >
        <IconNext />
      </button>
    </div>
  );
};

export default Pagination;
