import { configAPI } from "apis/configAPI";
import { Pagination } from "components/pagination";
import { IProduct } from "interfaces";
import { ProductItem } from "modules/product";
import { FilterSidebar, SearchSortBar } from "modules/search";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [results, setResults] = useState<IProduct[]>([]);
  const fetchSearchProducts = async () => {
    try {
      const { data } = await configAPI.getAllProduct();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSearchProducts();
  }, []);
  return (
    <div className='flex flex-col gap-6 mt-8 layout-container lg:flex-row'>
      <FilterSidebar />
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
  );
};

export default SearchPage;
