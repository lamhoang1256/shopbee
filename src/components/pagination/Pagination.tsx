import { IconNext, IconPrev } from "components/icons";
import { IPagination } from "@types";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import ButtonPage from "./ButtonPage";

interface PaginationProps {
  pagination: IPagination;
  handleClickNumberPage: (page: number) => void;
  goToNext?: () => void;
  goToPrev?: () => void;
}

const Pagination = ({ pagination, handleClickNumberPage, goToNext, goToPrev }: PaginationProps) => {
  console.log("goToPrev: ", goToPrev);
  console.log("goToNext: ", goToNext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const page = params.get("page") || 1;
  const goToNextDefault = () => {
    const newPage = Number(page) + 1;
    navigate(`?${queryString.stringify({ ...params, page: newPage })}`);
  };
  const goToPrevDefault = () => {
    const newPage = Number(page) - 1;
    navigate(`?${queryString.stringify({ ...params, page: newPage })}`);
  };

  return (
    <div className='flex gap-x-3 text-[#00000066] justify-center items-center my-8'>
      <button type='button' onClick={goToPrevDefault} disabled={pagination.page <= 1}>
        <IconPrev />
      </button>
      {Array(pagination.pageCount)
        .fill(0)
        .map((_, index) => (
          <ButtonPage
            active={index + 1 === pagination.page}
            onClick={() => handleClickNumberPage(index + 1)}
          >
            {index + 1}
          </ButtonPage>
        ))}
      <button
        type='button'
        onClick={goToNextDefault}
        disabled={pagination.page >= pagination.pageCount}
      >
        <IconNext />
      </button>
    </div>
  );
};

Pagination.defaultProps = {
  goToNext: () => {},
  goToPrev: () => {},
};

export default Pagination;
