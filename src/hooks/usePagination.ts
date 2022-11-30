import { useSearchParams } from "react-router-dom";
import { IProductSearchParams } from "@types";
import { removeEmptyStringValueObj } from "utils/helper";

export default function usePagination() {
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
  const handleFilter = (filterParams: Partial<IProductSearchParams>) => {
    const params = removeEmptyStringValueObj({ ...currentParams, ...filterParams });
    setSearchParams(params);
  };
  return {
    goPrevPage,
    goNextPage,
    handleFilter,
    handleClickNumberPage
  };
}
