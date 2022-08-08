import { IconNext, IconPrev } from "components/icons";
import { IPagination } from "interfaces";
import ButtonPage from "./ButtonPage";

interface PaginationProps {
  pagination: IPagination;
  goToNext: () => void;
  goToPrev: () => void;
  handleClickNumberPage: (page: number) => void;
}

// const limitButtonPage = 1
const Pagination = ({ pagination, goToNext, goToPrev, handleClickNumberPage }: PaginationProps) => {
  return (
    <div className='flex gap-x-3 text-[#00000066] justify-center items-center my-8'>
      <button type='button' onClick={goToPrev} disabled={pagination.page <= 1}>
        <IconPrev />
      </button>
      {Array(pagination.pageCount)
        .fill(0)
        .map((page, index) => (
          <ButtonPage
            active={index + 1 === pagination.page}
            onClick={() => handleClickNumberPage(index + 1)}
          >
            {index + 1}
          </ButtonPage>
        ))}
      <button type='button' onClick={goToNext} disabled={pagination.page >= pagination.pageCount}>
        <IconNext />
      </button>
    </div>
  );
};

export default Pagination;
