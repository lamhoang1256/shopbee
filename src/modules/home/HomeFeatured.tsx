import { SectionHeader } from "components/common";
import { Pagination } from "components/pagination";
import useFetchProducts from "hooks/useFetchProducts";
import { ProductGrid } from "modules/product";

const HomeFeatured = () => {
  const { products, pagination } = useFetchProducts();
  return (
    <div className='layout-container'>
      <SectionHeader>
        <h3 className='text-base font-medium text-orangeee4'>GỢI Ý HÔM NAY</h3>
      </SectionHeader>
      <ProductGrid products={products} />
      {products.length > 0 && <Pagination pagination={pagination} />}
    </div>
  );
};

export default HomeFeatured;
