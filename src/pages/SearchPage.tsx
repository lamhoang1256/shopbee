import { useEffect } from "react";
import { Pagination } from "components/_pagination";
import useFetchProducts from "hooks/useFetchProducts";
import { ProductGrid } from "modules/_product";
import { SearchAside, SearchSortBar } from "modules/search";
import { scrollTo } from "utils/helper";
import { Helmet } from "react-helmet-async";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const SearchPage = () => {
  const { products, pagination, searchParams, currentParams } = useFetchProducts();
  useEffect(() => {
    scrollTo();
  }, [searchParams]);
  return (
    <div className="flex flex-col gap-6 mt-8 layout-container lg:flex-row">
      <Helmet>
        <title>
          {currentParams?.name
            ? `${currentParams?.name} giá tốt Tháng ${currentMonth}, ${currentYear} | Mua ngay | Shopbee Việt Nam`
            : "Tìm kiếm sản phẩm"}
        </title>
      </Helmet>
      <SearchAside />
      <div className="flex-1">
        <SearchSortBar pagination={pagination} />
        <ProductGrid products={products} />
        {products.length > 0 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default SearchPage;
