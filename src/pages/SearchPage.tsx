import { productAPI } from "apis";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import useQueryParams from "hooks/useQueryParams";
import ProductList from "modules/Product/ProductList";
import SearchAside from "modules/Search/SearchAside";
import SearchSortBar from "modules/Search/SearchSortBar";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { scrollTo } from "utils";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const SearchPage = () => {
  const { queryParams } = useQueryParams();
  const { isLoading, data: productsData } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => productAPI.getAllProduct(queryParams),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  useEffect(() => {
    scrollTo();
  }, [queryParams]);
  return (
    <div className="flex flex-col gap-6 mt-8 layout-container lg:flex-row">
      <Helmet>
        <title>
          {queryParams?.name
            ? `${queryParams?.name} giá tốt Tháng ${currentMonth}, ${currentYear} | Mua ngay | Shopbee Việt Nam`
            : "Tìm kiếm sản phẩm"}
        </title>
      </Helmet>
      <SearchAside />
      <div className="flex-1">
        {isLoading && <Loading />}
        {!isLoading && productsData && (
          <>
            <SearchSortBar pagination={productsData?.data.pagination} />
            <ProductList products={productsData?.data.products} />
            <Pagination pagination={productsData?.data.pagination} />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
