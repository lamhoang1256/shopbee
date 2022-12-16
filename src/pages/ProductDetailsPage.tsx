import { IProduct } from "@types";
import { SectionGray, SectionWhite } from "components/_section";
import Loading from "components/Loading";
import { PriceOld, PriceSale } from "components/price";
import { QuantityController } from "components/quantityController";
import { Rating } from "components/rating";
import { Review } from "components/review";
import useFetchProduct from "hooks/useFetchProduct";
import useFetchShopInfo from "hooks/useFetchShopInfo";
import {
  ProductAddToCart,
  ProductDesc,
  ProductImageSlider,
  ProductNotFound,
  ProductRelated,
  ProductSaveWishlist,
  ProductShipping,
  ProductTitle
} from "modules/_product";
import { ShopOverview } from "modules/shop";
import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getHistoryLocalStorage, setHistoryLocalStorage } from "utils/localStorage";
import PageNotFound from "./PageNotFound";

const ProductDetailsPage = () => {
  const { id = "" } = useParams();
  const { loading, product } = useFetchProduct(id);
  const { shopInfo } = useFetchShopInfo();
  const calcPercentSale = useCallback(() => {
    return Math.ceil(100 - (product.price / product.oldPrice) * 100);
  }, [product]);
  const [quantityAdd, setQuantityAdd] = useState(1);
  const handleChangeQuantity = (quantity: number) => setQuantityAdd(() => quantity);

  useEffect(() => {
    if (!product?.name) return;
    const handleAddToHistory = (prod: IProduct) => {
      let history: IProduct[] = getHistoryLocalStorage();
      if (history.length >= 20) history.splice(19, 1);
      const isExist = history.some((item) => item._id === prod._id);
      if (isExist) history = history.filter((item) => item._id !== prod._id);
      history.unshift(prod);
      setHistoryLocalStorage(history);
    };
    handleAddToHistory(product);
  }, [product, id]);

  if (!id) return <PageNotFound />;
  if (loading) return <Loading />;
  if (!product.name) return <ProductNotFound />;
  return (
    <div className="layout-container">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className="flex flex-col gap-6 p-4 mt-6 bg-white lg:flex-row">
        <ProductImageSlider images={product.images} />
        <div className="flex-1">
          <ProductTitle className="text-[#242424] text-base lg:text-2xl">
            {product.name}
          </ProductTitle>
          <div className="flex flex-wrap items-center my-4 gap-x-4 gap-y-2">
            <span className="font-medium">{product.rating}</span>
            <span className="pr-4 border-r">
              <Rating rating={product.rating} />
            </span>
            <div className="pr-4 border-r border-[#00000024]">
              <span>{product.sold}</span>
              <span className="pl-3 text-[#767676] text-sm">Đã bán</span>
            </div>
            <ProductSaveWishlist />
          </div>
          <SectionGray className="flex flex-col-reverse md:flex-row md:items-center gap-x-3">
            <PriceOld className="text-[#929292]">{product.oldPrice}</PriceOld>
            <PriceSale className="text-lg font-medium lg:text-3xl">{product.price}</PriceSale>
            <span className="text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4">
              -{calcPercentSale()}%
            </span>
          </SectionGray>
          <ProductShipping shopCityId={shopInfo?.city?.id} />
          <div className="flex flex-col gap-y-2 md:items-center md:flex-row gap-x-4">
            <span>Số lượng</span>
            <QuantityController
              defaultQuantity={quantityAdd}
              onChangeValue={handleChangeQuantity}
            />
            <span>{product.stock} sản phẩm có sẵn</span>
          </div>
          <ProductAddToCart stock={product.stock} quantityAdd={quantityAdd} />
        </div>
      </div>
      <SectionWhite className="mt-4">
        <ShopOverview shopInfo={shopInfo} />
      </SectionWhite>
      <SectionWhite className="mt-4">
        <SectionGray>CHI TIẾT SẢN PHẨM</SectionGray>
        <ProductDesc description={product.description} />
      </SectionWhite>
      <SectionWhite className="mt-4">
        <SectionGray>ĐÁNH GIÁ SẢN PHẨM</SectionGray>
        <Review productId={id} />
      </SectionWhite>
      <ProductRelated categoryId={product.category} />
    </div>
  );
};

export default ProductDetailsPage;
