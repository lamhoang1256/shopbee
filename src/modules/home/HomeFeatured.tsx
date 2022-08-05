import { configAPI } from "apis/configAPI";
import { SectionHeader } from "components/common";
import { IProduct } from "interfaces";
import { ProductItem } from "modules/product";
import { useEffect, useState } from "react";

const HomeFeatured = () => {
  const [products, setProducts] = useState([]);
  const fetchHomeFeatured = async () => {
    try {
      const { data } = await configAPI.getAllProduct();
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
      <div className='my-3 grid-product'>
        {products?.map((product: IProduct) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeatured;
