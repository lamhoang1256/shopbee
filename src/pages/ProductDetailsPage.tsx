import { productAPI } from "apis";
import Loading from "components/Loading";
import useFetchShopInfo from "hooks/useFetchShopInfo";
import ProductDesc from "modules/Product/ProductDesc";
import ProductImageSlider from "modules/Product/ProductImageSlider";
import ProductMeta from "modules/Product/ProductMeta";
import ProductNotFound from "modules/Product/ProductNotFound";
import ProductPrice from "modules/Product/ProductPrice";
import ProductQuantity from "modules/Product/ProductQuantity";
import ProductRelated from "modules/Product/ProductRelated";
import ProductReview from "modules/Product/ProductReview";
import { ShopOverview } from "modules/shop";
import { ProductShipping } from "modules/_product";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { saveHistoryView } from "utils";
import PageNotFound from "./PageNotFound";

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
  const { shopInfo } = useFetchShopInfo();
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
          <ProductShipping shopCityId={shopInfo?.city?.id} />
          <ProductQuantity stock={product.stock} />
        </div>
      </div>
      <ShopOverview shopInfo={shopInfo} />
      <ProductDesc description={product.description} />
      <ProductReview productId={id} />
      <ProductRelated categoryId={product.category} />
    </div>
  );
};

export default ProductDetailsPage;
