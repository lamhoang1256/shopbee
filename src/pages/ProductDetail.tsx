import { configAPI } from "apis/configAPI";
import { ButtonAddToCart } from "components/button";
import { SectionGray } from "components/common";
import { QualityController } from "components/qualityController";
import { IProduct } from "interfaces";
import {
  ProductImage,
  ProductLabelSale,
  ProductPriceOld,
  ProductPriceSale,
  ProductRating,
  ProductSold,
  ProductTitle,
} from "modules/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatVNDCurrency } from "utils/helper";
import { PageNotFound } from "./PageNotFound";

const ProductDetail = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<IProduct>(Object);
  const fetchProductDetail = async () => {
    try {
      const { data } = await configAPI.getSingleProduct(id || "");
      setProductInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductDetail();
  }, [id]);
  if (!id) return <PageNotFound />;
  if (!productInfo.name) return <div className='layout-container'>Product not exist</div>;
  const percentSale = Math.ceil(100 - (productInfo.priceSale / productInfo.price) * 100);
  return (
    <>
      <div className='flex p-4 mt-6 bg-white layout-container gap-x-5'>
        <div className='flex-shrink-0 w-[400px]'>
          <ProductImage imageUrl={productInfo.image} />
        </div>
        <div>
          <ProductTitle className='text-xl font-medium'>{productInfo.name}</ProductTitle>
          <div className='flex items-center my-4 gap-x-4'>
            <span className='border-b text-orangeee border-orangeee'>{productInfo.rating}</span>
            <ProductRating rating={productInfo.rating} />
            <ProductSold className='pl-4 border-l border-[#00000024]'>
              {productInfo.sold}
            </ProductSold>
          </div>
          <SectionGray className='flex items-center gap-x-3'>
            <ProductPriceOld className='text-[#929292]'>
              {formatVNDCurrency(productInfo.price)}
            </ProductPriceOld>
            <ProductPriceSale className='text-3xl font-medium'>
              {formatVNDCurrency(productInfo.priceSale)}
            </ProductPriceSale>
            <ProductLabelSale>{percentSale}% GIẢM</ProductLabelSale>
          </SectionGray>
          <div className='flex items-center mt-6 gap-x-4'>
            <span>Số lượng</span>
            <QualityController />
            <span>{productInfo.quantity} sản phẩm có sẵn</span>
          </div>
          <ButtonAddToCart />
        </div>
      </div>
      <div className='p-4 mt-6 bg-white layout-container'>
        <SectionGray>MÔ TẢ SẢN PHẨM</SectionGray>
        <p
          className='mt-3 leading-6'
          dangerouslySetInnerHTML={{
            __html: productInfo.description || "",
          }}
        />
      </div>
    </>
  );
};

export default ProductDetail;
