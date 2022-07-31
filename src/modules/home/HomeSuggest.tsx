import { configAPI } from "apis/configAPI";
import { ButtonShowMore } from "components/button";
import { IProduct } from "interfaces";
import { ProductItem } from "modules/product";
import { useEffect, useState } from "react";

const HomeSuggest = () => {
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
    <div className='mt-5 layout-container'>
      <div className='px-[10px] py-4 bg-white rounded text-xl'>Gợi Ý Hôm Nay</div>
      <ul className='grid grid-cols-8 gap-1 my-2'>
        <li className='flex flex-col items-center p-2 bg-white rounded gap-y-1'>
          <img
            src='https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp'
            alt='suggest'
            className='w-12 h-12 rounded-full'
          />
          <span className='text-[#787878]'>Dành cho bạn</span>
        </li>
        <li className='flex flex-col items-center p-2 bg-white border rounded gap-y-1 border-orangeee4'>
          <img
            src='https://salt.tikicdn.com/cache/w100/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png.webp'
            alt='suggest'
            className='w-12 h-12 rounded-full'
          />
          <span className='text-[#787878]'>Siêu sale</span>
        </li>
      </ul>
      <div className='grid-product'>
        {products?.map((product: IProduct) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
      <ButtonShowMore className='mx-auto mt-6'>Xem thêm</ButtonShowMore>
    </div>
  );
};

export default HomeSuggest;
