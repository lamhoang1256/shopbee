import { IconNext, IconPrev } from "components/icons";
import { v4 as uuidv4 } from "uuid";
import ButtonPage from "./ButtonPage";

interface PaginationV2Props extends React.HTMLAttributes<HTMLDivElement> {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  handleChangePage: (pageNumber: number) => void;
}

const PaginationV2 = ({
  itemsPerPage,
  currentPage,
  totalItems,
  handleChangePage,
  className,
}: PaginationV2Props) => {
  const totalPage: number[] = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    totalPage.push(i);
  }
  return (
    <div
      className={`flex flex-wrap gap-x-3 gap-y-2 text-[#00000066] justify-center items-center my-8 ${className}`}
    >
      <button
        type='button'
        className='cursor-pointer disabled:cursor-not-allowed'
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <IconPrev />
      </button>
      {totalPage.map((page) => (
        <ButtonPage
          key={uuidv4()}
          active={page === currentPage}
          onClick={() => handleChangePage(page)}
        >
          {page}
        </ButtonPage>
      ))}
      <button
        type='button'
        className='cursor-pointer disabled:cursor-not-allowed'
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage >= totalPage.length}
      >
        <IconNext />
      </button>
    </div>
  );
};

export default PaginationV2;
