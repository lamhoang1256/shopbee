import { SectionHeader } from "components/section";
import { Pagination } from "components/pagination";
import useFetchProducts from "hooks/useFetchProducts";
import { ProductGrid } from "modules/product";
import { useEffect, useRef } from "react";
import { isEmptyObject } from "utils/helper";

const HomeFeatured = () => {
  const { products, searchParams, currentParams, pagination, loading } = useFetchProducts();
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sectionRef.current && !isEmptyObject(currentParams)) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);
  return (
    <div className='layout-container' ref={sectionRef}>
      <SectionHeader>
        <h2 className='text-base font-medium text-orangeee4'>GỢI Ý HÔM NAY</h2>
      </SectionHeader>
      <ProductGrid products={products} loading={loading} />
      {products.length > 0 && <Pagination pagination={pagination} />}
    </div>
  );
};

export default HomeFeatured;
