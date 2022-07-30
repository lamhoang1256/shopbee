import { configAPI } from "apis/configAPI";
import { IProduct } from "interfaces";
import { ProductLabelSale, ProductPriceSale, ProductSaleBar } from "modules/product";
import { useEffect, useState } from "react";
import { formatMoney } from "utils/helper";

const HomeFlashSale = () => {
  const [products, setProducts] = useState([]);
  const fetchHomeFlashSale = async () => {
    try {
      const { data } = await configAPI.getAllProduct();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHomeFlashSale();
  }, []);
  return (
    <div className='layout-container'>
      <div className='p-4 bg-white'>
        <h3 className='mb-2 text-xl font-medium text-[#ff5e00]'>Giá sốc hôm nay</h3>
        <div className='grid-product'>
          {products?.map((product: IProduct) => {
            const countProductSold = Math.floor(Math.random() * 50);
            return (
              <div className='p-2'>
                <img src={product.image} alt='product' />
                <div className='flex items-center mt-2 gap-x-2'>
                  <ProductPriceSale>{formatMoney(product.priceSale)}</ProductPriceSale>
                  <ProductLabelSale>
                    -{Math.ceil((1 - product.priceSale / product.price) * 100)}%
                  </ProductLabelSale>
                </div>
                <ProductSaleBar percent={countProductSold * 2}>
                  Đã bán {countProductSold}
                </ProductSaleBar>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeFlashSale;
