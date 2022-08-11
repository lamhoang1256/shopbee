import { IPagination } from "@types";
import { v4 as uuidv4 } from "uuid";
import { IconNext, IconPrev } from "components/icons";
import { useSearchParams } from "react-router-dom";
import ButtonPage from "./ButtonPage";

interface PaginationProps {
  pagination: IPagination;
}

const Pagination = ({ pagination }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);
  const currentPage = Number(searchParams.get("page") || 1);

  const goPrevPage = () => {
    const prevPage = currentPage - 1;
    setSearchParams({ ...currentParams, page: prevPage.toString() });
  };
  const goNextPage = () => {
    const nextPage = currentPage + 1;
    setSearchParams({ ...currentParams, page: nextPage.toString() });
  };
  const handleClickNumberPage = (page: number) => {
    setSearchParams({ ...currentParams, page: page.toString() });
  };

  return (
    <div className='flex gap-x-3 text-[#00000066] justify-center items-center my-8'>
      <button type='button' onClick={goPrevPage} disabled={pagination.page <= 1}>
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
      <button type='button' onClick={goNextPage} disabled={pagination.page >= pagination.pageCount}>
        <IconNext />
      </button>
    </div>
  );
};

export default Pagination;
