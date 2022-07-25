import { configAPI } from "apis/configAPI";
import { SectionHeader } from "components/common";
import { ProductItem } from "modules/product";
import { useEffect, useState } from "react";

const HomeFeatured = () => {
  const [products, setProducts] = useState([]);
  const fetchHomeFeatured = async () => {
    try {
      const { data } = await configAPI.getAllProduct();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHomeFeatured();
  }, []);
  return (
    <div className='layout-container'>
      <SectionHeader>Sản phẩm nổi bật</SectionHeader>
      <div className='grid-product'>
        {products?.map((product: any) => (
          <ProductItem product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeatured;