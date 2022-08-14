import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPagination, IProduct } from "@types";
import { productAPI } from "apis";
import { SectionHeader } from "components/common";
import { Pagination } from "components/pagination";
import { ProductItem } from "modules/product";

const initialPagination = { limit: 30, page: 1, pageCount: 1 };
const HomeFeatured = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  useEffect(() => {
    const fetchHomeFeatured = async () => {
      try {
        const { data } = await productAPI.getAllProduct({ page });
        setProducts(data?.products);
        setPagination(data?.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomeFeatured();
  }, [page]);
  return (
    <div className='layout-container'>
      <SectionHeader>
        <h3 className='text-base font-medium text-orangeee4'>GỢI Ý HÔM NAY</h3>
      </SectionHeader>
      <div className='my-3 product-grid'>
        {products?.map((product: IProduct) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
      {products.length > 0 && <Pagination pagination={pagination} />}
    </div>
  );
};

export default HomeFeatured;
