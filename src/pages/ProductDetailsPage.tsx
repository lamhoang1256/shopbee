import { IProduct, IShop } from "@types";
import { cartAPI, productAPI, shopAPI } from "apis";
import { Button, ButtonOutline } from "components/button";
import { SectionGray, SectionWhite } from "components/common";
import SaveWishlist from "components/common/SaveWishlist";
import { IconCartOutline } from "components/icons";
import { Loading } from "components/loading";
import { QuantityController } from "components/quantityController";
import { Rating } from "components/rating";
import { Review } from "components/review";
import { Option, Select } from "components/select";
import useFetchAdministrative from "hooks/useFetchAdministrative";
import useFetchProduct from "hooks/useFetchProduct";
import {
  ProductDesc,
  ProductGrid,
  ProductImageSlider,
  ProductNotFound,
  ProductPriceOld,
  ProductPriceSale,
  ProductTitle,
} from "modules/product";
import { ShopOverview } from "modules/shop";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { calcShippingFee, formatMoney } from "utils/helper";
import PageNotFound from "./PageNotFound";

const ProductDetailsPage = () => {
  const { id = "" } = useParams();
  const { setCart, carts, currentUser } = useStore((state) => state);
  const { loading, product } = useFetchProduct(id);
  const { citys } = useFetchAdministrative();
  const [cityId, setCityId] = useState(currentUser.cityId);
  const [shopInfo, setShopInfo] = useState<IShop>(Object);
  const [shippingFee, setShippingFee] = useState(0);
  const [quantityAdd, setQuantityAdd] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([]);

  const handleChangeQuantity = (value: number) => setQuantityAdd(() => value);
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

  const handleAddToCart = async () => {
    let quantity = quantityAdd;
    const existItem = carts?.find((cart) => cart.product._id === id);
    if (existItem) {
      quantity = existItem.quantity + quantityAdd;
      existItem.quantity = quantity;
    }
    try {
      const { message, data } = await cartAPI.addToCart({ productId: id, quantity });
      if (existItem) {
        const cartsRemoveExist = carts?.filter((cart) => cart?._id !== existItem?._id);
        setCart([...cartsRemoveExist, existItem]);
      } else {
        setCart([...carts, data]);
      }
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (!product?.name) return;
    fetchRelatedProduct({ category: product.category });
    handleAddToHistory(product);
  }, [product, id]);

  useEffect(() => {
    const fetchShopInfo = () => {
      shopAPI.getShopInfo().then((res) => {
        setShopInfo(res.data);
        setCityId(res.data.cityId);
      });
    };
    fetchShopInfo();
  }, []);

  useEffect(() => {
    setShippingFee(calcShippingFee(shopInfo.cityId, cityId));
  }, [cityId]);

  if (!id) return <PageNotFound />;
  if (loading) return <Loading />;
  if (!product.name) return <ProductNotFound />;
  const percentSale = Math.ceil(100 - (product.price / product.oldPrice) * 100);

  return (
    <div className='layout-container'>
      <div className='flex flex-col gap-6 p-4 mt-6 bg-white lg:flex-row'>
        <div className='flex-shrink-0 lg:w-[400px]'>
          <ProductImageSlider images={product.images} />
          <SaveWishlist productId={id} />
        </div>
        <div>
          <ProductTitle className='text-[#242424] text-base lg:text-2xl'>
            {product.name}
          </ProductTitle>
          <div className='flex items-center my-4 gap-x-3'>
            <span className='font-medium'>{product.rating}</span>
            <Rating rating={product.rating} />
            <div className='pl-4 border-l border-[#00000024]'>
              {product.sold}
              <span className='pl-3 text-[#767676] text-sm'>Đã bán</span>
            </div>
          </div>
          <SectionGray className='flex flex-col-reverse md:flex-row md:items-center gap-x-3'>
            <ProductPriceOld className='text-[#929292]'>
              {formatMoney(product.oldPrice)}
            </ProductPriceOld>
            <ProductPriceSale className='text-lg font-medium lg:text-3xl'>
              {formatMoney(product.price)}
            </ProductPriceSale>
            <span className='text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4'>
              -{percentSale}%
            </span>
          </SectionGray>
          <div className='mt-3'>
            <span>Vận chuyển từ: {shopInfo.administrative}</span>
            <div className='my-1'>
              <span>Vận chuyển tới:</span>
              <Select
                value={cityId}
                className='px-1 ml-1 h-7'
                onChange={(e) => setCityId(e.target.value)}
              >
                <Option value='01'>Chọn Tỉnh/Thành Phố</Option>
                {citys?.map((city) => (
                  <Option value={city.cityId} key={city.cityId}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <span>Phí vận chuyển: {formatMoney(shippingFee)}</span>
          <div className='flex flex-col mt-6 gap-y-2 md:items-center md:flex-row gap-x-4'>
            <span>Số lượng</span>
            <QuantityController onChangeValue={handleChangeQuantity} />
            <span>{product.stock} sản phẩm có sẵn</span>
          </div>
          {product.stock > 0 ? (
            <div className='flex flex-col gap-2 mt-4 md:flex-row md:items-center'>
              <ButtonOutline className='h-10 lg:h-12' onClick={handleAddToCart}>
                <IconCartOutline className='w-4 h-4 mr-2' />
                <span className='text-sm'>Thêm vào giỏ hàng</span>
              </ButtonOutline>
              <Button primary className='h-10 rounded-sm lg:h-12'>
                Mua ngay
              </Button>
            </div>
          ) : (
            <span className='block mt-4 text-lg text-redff4'>Sản phẩm đã hết hàng</span>
          )}
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
