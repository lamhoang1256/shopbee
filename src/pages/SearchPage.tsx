import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPagination, IProduct } from "@types";
import { productAPI } from "apis";
import { Pagination } from "components/pagination";
import { ProductItem } from "modules/product";
import { SearchSidebar, SearchSortBar } from "modules/search";

const initialPagination = { limit: 30, page: 1, pageCount: 1 };
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);
  const [results, setResults] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);

  useEffect(() => {
    const fetchSearchProducts = async (params: { [k: string]: string }) => {
      try {
        const { data } = await productAPI.getAllProduct(params);
        setResults(data?.products);
        setPagination(data?.pagination);
      } catch (error) {
        console.log(`Failed to fetch products:`, error);
      }
    };
    fetchSearchProducts(currentParams);
  }, [currentParams]);

  return (
    <div className='flex flex-col gap-6 mt-8 layout-container lg:flex-row'>
      <SearchSidebar />
      <div className='flex-1'>
        <SearchSortBar pagination={pagination} />
        <div className='mt-5 product-grid'>
          {results?.map((product) => (
            <ProductItem product={product} key={product._id} />
          ))}
        </div>
        {results.length > 0 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default SearchPage;
