import { IProductSearchParams } from "@types";
import { removeEmptyStringValueObj } from "utils/helper";
import useQueryParams from "./useQueryParams";

export default function usePagination() {
  const { queryParams, setSearchParams } = useQueryParams();
  const currentPage = Number(queryParams?.page) || 1;
  const goPrevPage = () => {
    const prevPage = currentPage - 1;
    setSearchParams({ ...queryParams, page: prevPage.toString() });
  };
  const goNextPage = () => {
    const nextPage = currentPage + 1;
    setSearchParams({ ...queryParams, page: nextPage.toString() });
  };
  const handleClickNumberPage = (page: number) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };
  const handleFilter = (filterParams: Partial<IProductSearchParams>) => {
    const params = removeEmptyStringValueObj({ ...queryParams, ...filterParams });
    setSearchParams(params);
  };
  return {
    goPrevPage,
    goNextPage,
    handleFilter,
    handleClickNumberPage
  };
}
