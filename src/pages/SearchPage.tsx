import { Pagination } from "components/pagination";
import useFetchProducts from "hooks/useFetchProducts";
import { ProductGrid } from "modules/product";
import { SearchSidebar, SearchSortBar } from "modules/search";

const SearchPage = () => {
  const { products, pagination } = useFetchProducts();
  return (
    <div className='flex flex-col gap-6 mt-8 layout-container lg:flex-row'>
      <SearchSidebar />
      <div className='flex-1'>
        <SearchSortBar pagination={pagination} />
        <ProductGrid products={products} />
        {products.length > 0 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default SearchPage;
