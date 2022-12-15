import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { isEmptyObject } from "utils/helper";
import { productAPI } from "apis";
import Pagination from "components/Pagination";
import useQueryParams from "hooks/useQueryParams";
import ProductList from "modules/Product/ProductList";
import ProductListSekeleton from "modules/Product/ProductSekeleton";

const HomeProducts = () => {
  const queryParams = useQueryParams();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isLoading, data: productsData } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => productAPI.getAllProduct(queryParams),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  useEffect(() => {
    if (sectionRef.current && !isEmptyObject(queryParams)) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [queryParams]);
  return (
    <div className="layout-container" ref={sectionRef}>
      <div className="px-5 py-4 uppercase bg-white text-base font-medium text-orangeee4">
        <h2 className="">GỢI Ý HÔM NAY</h2>
      </div>
      {isLoading && <ProductListSekeleton />}
      {!isLoading && productsData && (
        <>
          <ProductList products={productsData.data.products} />
          <Pagination pagination={productsData.data.pagination} />
        </>
      )}
    </div>
  );
};

export default HomeProducts;
