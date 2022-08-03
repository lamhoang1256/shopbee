import { configAPI } from "apis/configAPI";
import { Pagination } from "components/pagination";
import { IProduct } from "interfaces";
import { ISearchParams } from "interfaces/search";
import { ProductItem } from "modules/product";
import { SearchSidebar, SearchSortBar, SearchProvider } from "modules/search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [results, setResults] = useState<IProduct[]>([]);
  const [searchParams] = useSearchParams();
  const searchPageParams: ISearchParams = {
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 30,
    category: searchParams.get("category") || "",
    rating: searchParams.get("rating") || "",
    price_max: searchParams.get("price_max") || "",
    price_min: searchParams.get("price_min") || "",
    sort_by: searchParams.get("sortBy") || "",
    order: searchParams.get("order") || "",
    name: searchParams.get("name") || "",
  };
  Object.keys(searchPageParams).forEach((key) => {
    if (searchPageParams[key as keyof ISearchParams] === "") {
      delete searchPageParams[key as keyof ISearchParams];
    }
  });

  const fetchSearchProducts = async (params: ISearchParams) => {
    try {
      const { data } = await configAPI.getAllProduct(params);
      setResults(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSearchProducts(searchPageParams);
  }, [searchParams]);

  return (
    <SearchProvider value={{ searchPageParams }}>
      <div className='flex flex-col gap-6 mt-8 layout-container lg:flex-row'>
        <SearchSidebar />
        <div className='flex-1'>
          <SearchSortBar />
          <div className='mt-5 grid-product'>
            {results?.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </SearchProvider>
  );
};

export default SearchPage;
