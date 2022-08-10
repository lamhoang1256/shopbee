import { configAPI } from "apis/configAPI";
import { Pagination } from "components/pagination";
import { path } from "constants/path";
import queryString from "query-string";
import { IPagination, IProduct, ISearchParams } from "interfaces";
import { ProductItem } from "modules/product";
import { SearchSidebar, SearchSortBar, SearchProvider } from "modules/search";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const [searchParams] = useSearchParams();
  const searchPageParams: ISearchParams = {
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 30,
    category: searchParams.get("category") || "",
    rating: searchParams.get("rating") || "",
    price_max: searchParams.get("price_max") || "",
    price_min: searchParams.get("price_min") || "",
    sort_by: searchParams.get("sort_by") || "",
    order: searchParams.get("order") || "",
    name: searchParams.get("name") || "",
  };
  Object.keys(searchPageParams).forEach((key) => {
    if (searchPageParams[key as keyof ISearchParams] === "") {
      delete searchPageParams[key as keyof ISearchParams];
    }
  });

  const handleSearch = (params: any) => {
    const newParams: ISearchParams = {
      ...searchPageParams,
      ...params,
    };
    navigate(`${path.search}?${queryString.stringify(newParams)}`);
  };

  const goNextPage = () => {
    const newPage = Number(searchPageParams.page) + 1;
    handleSearch({ page: newPage });
  };
  const goPrevPage = () => {
    const newPage = Number(searchPageParams.page) - 1;
    handleSearch({ page: newPage });
  };
  const handleClickNumberPage = (page: number) => {
    handleSearch({ page: Number(page) });
  };

  useEffect(() => {
    const fetchSearchProducts = async (params: ISearchParams) => {
      try {
        const { data } = await configAPI.getAllProduct(params);
        setResults(data?.products);
        setPagination(data?.pagination);
      } catch (error) {
        console.log(`Failed to fetch products:`, error);
      }
    };
    fetchSearchProducts(searchPageParams);
  }, [searchParams]);

  return (
    <SearchProvider value={{ searchPageParams, pagination, handleSearch }}>
      <div className='flex flex-col gap-6 mt-8 layout-container lg:flex-row'>
        <SearchSidebar />
        <div className='flex-1'>
          <SearchSortBar />
          <div className='mt-5 product-grid'>
            {results?.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </div>
          {results.length > 0 && (
            <Pagination
              pagination={pagination}
              goToNext={goNextPage}
              goToPrev={goPrevPage}
              handleClickNumberPage={handleClickNumberPage}
            />
          )}
        </div>
      </div>
    </SearchProvider>
  );
};

export default SearchPage;
