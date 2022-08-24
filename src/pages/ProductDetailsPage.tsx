import { IProduct, IShop } from "@types";
import { productAPI, shopAPI } from "apis";
import { SaveWishlist, SectionGray, SectionWhite } from "components/common";
import { Loading } from "components/loading";
import { Rating } from "components/rating";
import { Review } from "components/review";
import useFetchProduct from "hooks/useFetchProduct";
import {
  ProductAction,
  ProductDesc,
  ProductGrid,
  ProductImageSlider,
  ProductNotFound,
  ProductShipping,
  ProductTitle,
} from "modules/product";
import { PriceSale, PriceOld } from "components/price";
import { ShopOverview } from "modules/shop";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const ProductDetailsPage = () => {
  const { id = "" } = useParams();
  const { loading, product } = useFetchProduct(id);
  const [shopInfo, setShopInfo] = useState<IShop>(Object);
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([]);
  const percentSale = Math.ceil(100 - (product.price / product.oldPrice) * 100);

  const handleAddToHistory = (prod: IProduct) => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    if (history.length >= 20) history.splice(19, 1);
    const index = history.findIndex((item: IProduct) => item._id === id);
    if (index === -1) history.unshift(prod);
    if (index !== -1) {
      history.splice(index, 1);
      history.unshift(prod);
    }
    localStorage.setItem("history", JSON.stringify(history));
  };
  const fetchRelatedProduct = async (params: { category: string }) => {
    try {
      const { data } = await productAPI.getAllProduct(params);
      setRelatedProduct(data.products);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const fetchShopInfo = async () => {
    try {
      const { data } = await shopAPI.getShopInfo();
      setShopInfo(data);
    } catch (error) {
      console.log("Failed to fetch address: ", error);
    }
  };
  useEffect(() => {
    if (!product?.name) return;
    fetchShopInfo();
    fetchRelatedProduct({ category: product.category });
    handleAddToHistory(product);
  }, [product, id]);

  if (!id) return <PageNotFound />;
  if (loading) return <Loading />;
  if (!product.name) return <ProductNotFound />;

  return (
    <div className='layout-container'>
      <div className='flex flex-col gap-6 p-4 mt-6 bg-white lg:flex-row'>
        <div className='flex-shrink-0 lg:w-[400px]'>
          <ProductImageSlider images={product.images} />
        </div>
        <div className='flex-1'>
          <ProductTitle className='text-[#242424] text-base lg:text-2xl'>
            {product.name}
          </ProductTitle>
          <div className='flex flex-wrap items-center my-4 gap-x-4'>
            <span className='font-medium'>{product.rating}</span>
            <span className='pr-4 border-r'>
              <Rating rating={product.rating} />
            </span>
            <div className='pr-4 border-r border-[#00000024]'>
              {product.sold}
              <span className='pl-3 text-[#767676] text-sm'>Đã bán</span>
            </div>
            <SaveWishlist />
          </div>
          <SectionGray className='flex flex-col-reverse md:flex-row md:items-center gap-x-3'>
            <PriceOld className='text-[#929292]'>{product.oldPrice}</PriceOld>
            <PriceSale className='text-lg font-medium lg:text-3xl'>{product.price}</PriceSale>
            <span className='text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4'>
              -{percentSale}%
            </span>
          </SectionGray>
          <ProductShipping shopCityId={shopInfo?.city?.id} />
          <ProductAction product={product} />
        </div>
      </div>
      <SectionWhite className='mt-4'>
        <ShopOverview shopInfo={shopInfo} />
      </SectionWhite>
      <SectionWhite className='mt-4'>
        <SectionGray>CHI TIẾT SẢN PHẨM</SectionGray>
        <ProductDesc description={product.description} />
      </SectionWhite>
      <SectionWhite className='mt-4'>
        <SectionGray>ĐÁNH GIÁ SẢN PHẨM</SectionGray>
        <Review reviews={product.reviews} />
      </SectionWhite>
      {relatedProduct?.length > 0 && (
        <ProductGrid title='SẢN PHẨM TƯƠNG TỰ' products={relatedProduct} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
