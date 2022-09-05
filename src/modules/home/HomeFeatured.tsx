import { SectionHeader } from "components/common";
import { Pagination } from "components/pagination";
import useFetchProducts from "hooks/useFetchProducts";
import { ProductGrid } from "modules/product";
import { useEffect, useRef } from "react";

const HomeFeatured = () => {
  const { products, searchParams, pagination } = useFetchProducts();
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sectionRef.current) sectionRef.current.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);
  return (
    <div className='layout-container' ref={sectionRef}>
      <SectionHeader>
        <h3 className='text-base font-medium text-orangeee4'>GỢI Ý HÔM NAY</h3>
      </SectionHeader>
      <ProductGrid products={products} />
      {products.length > 0 && <Pagination pagination={pagination} />}
    </div>
  );
};

export default HomeFeatured;
