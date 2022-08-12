import { useEffect, useState } from "react";
import { IProduct } from "@types";
import { productAPI } from "apis";
import { SectionHeader } from "components/common";
import { ProductItem } from "modules/product";

const HomeFeatured = () => {
  const [products, setProducts] = useState([]);
  const fetchHomeFeatured = async () => {
    try {
      const { data } = await productAPI.getAllProduct();
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHomeFeatured();
  }, []);
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
    </div>
  );
};

export default HomeFeatured;
