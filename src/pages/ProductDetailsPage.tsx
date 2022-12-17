import { IShopInfo } from "@types";
import { productAPI, shopAPI } from "apis";
import Loading from "components/Loading";
import ShopOverview from "modules/Common/ShopOverview";
import ProductDesc from "modules/Product/ProductDesc";
import ProductImageSlider from "modules/Product/ProductImageSlider";
import ProductMeta from "modules/Product/ProductMeta";
import ProductNotFound from "modules/Product/ProductNotFound";
import ProductPrice from "modules/Product/ProductPrice";
import ProductQuantity from "modules/Product/ProductQuantity";
import ProductRelated from "modules/Product/ProductRelated";
import ProductReview from "modules/Product/ProductReview";
import ProductShipping from "modules/Product/ProductShipping";
import PageNotFound from "pages/PageNotFound";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { saveHistoryView } from "utils";

const ProductDetailsPage = () => {
  const { id = "" } = useParams();
  const { isLoading, data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productAPI.getSingleProduct(id),
    staleTime: 5 * 60 * 1000,
    onSuccess: ({ data }) => {
      saveHistoryView(data);
    }
  });
  const { data: shopInfoData } = useQuery({
    queryKey: ["shopinfo"],
    queryFn: () => shopAPI.getShopInfo(),
    staleTime: 5 * 60 * 1000
  });
  if (!id) return <PageNotFound />;
  if (isLoading) return <Loading />;
  if (!productData?.data) return <ProductNotFound />;
  const { data: product } = productData;
  return (
    <div className="layout-container">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className="flex flex-col gap-6 p-4 mt-6 bg-white lg:flex-row">
        <ProductImageSlider images={product.images} productName={product.name} />
        <div className="flex-1">
          <h1 className="text-[#242424] text-base lg:text-2xl">{product.name}</h1>
          <ProductMeta rating={product.rating} sold={product.sold} />
          <ProductPrice oldPrice={product.oldPrice} price={product.price} />
          <ProductShipping shopCityId={shopInfoData?.data?.city?.id as string} />
          <ProductQuantity stock={product.stock} />
        </div>
      </div>
      <ShopOverview shopInfo={shopInfoData?.data as IShopInfo} />
      <ProductDesc description={product.description} />
      <ProductReview productId={id} />
      <ProductRelated categoryId={product.category} />
    </div>
  );
};

export default ProductDetailsPage;
