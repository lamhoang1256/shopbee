import { ICity, IProduct, IShop } from "@types";
import { addressAPI, cartAPI, productAPI, shopAPI, userAPI } from "apis";
import { Button, ButtonOutline } from "components/button";
import { SectionGray, SectionWhite } from "components/common";
import { IconCartOutline, IconHeart } from "components/icons";
import { Loading } from "components/loading";
import { QuantityController } from "components/quantityController";
import { Rating } from "components/rating";
import { Review } from "components/review";
import { Option, Select } from "components/select";
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
  const { setCart, carts, currentUser, setCurrentUser } = useStore((state) => state);
  const [loading, setLoading] = useState(true);
  const [citys, setCitys] = useState<ICity[]>([]);
  const [cityId, setCityId] = useState(currentUser.cityId);
  const [productInfo, setProductInfo] = useState<IProduct>(Object);
  const [shopInfo, setShopInfo] = useState<IShop>(Object);
  const [shippingFee, setShippingFee] = useState(0);
  const [quantityAdd, setQuantityAdd] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([]);
  const [isAddedWishlist, setIsAddedWishlist] = useState(currentUser.wishlist?.indexOf(id) !== -1);

  const handleChangeQuantityController = (value: number) => {
    setQuantityAdd(() => value);
  };

  const handleAddToHistory = (product: IProduct) => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    if (history.length >= 20) history.splice(19, 1);
    const index = history.findIndex((item: IProduct) => item._id === id);
    if (index === -1) history.unshift(product);
    if (index !== -1) {
      history.splice(index, 1);
      history.unshift(product);
    }
    localStorage.setItem("history", JSON.stringify(history));
  };

  useEffect(() => {
    const fetchRelatedProduct = async (params: { category: string }) => {
      productAPI.getAllProduct(params).then((res) => setRelatedProduct(res.data.products));
    };
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.getSingleProduct(id || "");
        fetchRelatedProduct({ category: data.category._id });
        setProductInfo(data);
        handleAddToHistory(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  useEffect(() => {
    const fetchAllCity = () => {
      addressAPI.getAllCity().then((res) => setCitys(res.data));
    };
    const fetchShopInfo = () => {
      shopAPI.getShopInfo().then((res) => {
        setShopInfo(res.data);
        setCityId(res.data.cityId);
      });
    };
    fetchAllCity();
    fetchShopInfo();
  }, []);

  useEffect(() => {
    setShippingFee(calcShippingFee(shopInfo.cityId, cityId));
  }, [cityId]);

  if (!id) return <PageNotFound />;
  if (loading) return <Loading />;
  if (!productInfo.name) return <ProductNotFound />;
  const percentSale = Math.ceil(100 - (productInfo.price / productInfo.oldPrice) * 100);

  const handleAddToWishlist = async () => {
    try {
      const { message, data } = await userAPI.addToWishlist({ productId: id });
      toast.success(message);
      setCurrentUser(data);
      setIsAddedWishlist(true);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const { message, data } = await userAPI.removeFromWishlist({ productId: id });
      toast.success(message);
      setCurrentUser(data);
      setIsAddedWishlist(false);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleAddToCart = async () => {
    let quantity = quantityAdd;
    const existCartItem = carts?.find((cart) => cart.product._id === id);
    if (existCartItem) {
      quantity = existCartItem.quantity + quantityAdd;
      existCartItem.quantity += quantityAdd;
    }
    const values = {
      productId: id,
      quantity,
    };
    try {
      const { message, data } = await cartAPI.addToCart(values);
      if (existCartItem) {
        const cartsWithoutExistCartItem = carts?.filter((cart) => cart?._id !== existCartItem?._id);
        setCart([...cartsWithoutExistCartItem, existCartItem]);
      } else {
        setCart([...carts, data]);
      }
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='layout-container'>
      <div className='flex flex-col gap-6 p-4 mt-6 bg-white lg:flex-row'>
        <div className='flex-shrink-0 lg:w-[400px]'>
          <ProductImageSlider images={productInfo.images} />
          <div className='flex items-center my-3 gap-x-2'>
            {isAddedWishlist ? (
              <button type='button' onClick={handleRemoveFromWishlist}>
                <IconHeart active />
              </button>
            ) : (
              <button type='button' onClick={handleAddToWishlist}>
                <IconHeart active={false} />
              </button>
            )}
            <span className='text-base'>Đã thích</span>
          </div>
        </div>
        <div>
          <ProductTitle className='text-[#242424] text-base lg:text-2xl'>
            {productInfo.name}
          </ProductTitle>
          <div className='flex items-center my-4 gap-x-3'>
            <span className='font-medium'>{productInfo.rating}</span>
            <Rating rating={productInfo.rating} />
            <div className='pl-4 border-l border-[#00000024]'>
              {productInfo.sold}
              <span className='pl-3 text-[#767676] text-sm'>Đã bán</span>
            </div>
          </div>
          <SectionGray className='flex flex-col-reverse md:flex-row md:items-center gap-x-3'>
            <ProductPriceOld className='text-[#929292]'>
              {formatMoney(productInfo.oldPrice)}
            </ProductPriceOld>
            <ProductPriceSale className='text-lg font-medium lg:text-3xl'>
              {formatMoney(productInfo.price)}
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
            <QuantityController onChangeValue={handleChangeQuantityController} />
            <span>{productInfo.stock} sản phẩm có sẵn</span>
          </div>
          {productInfo.stock > 0 ? (
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
        <ProductDesc description={productInfo.description} />
      </SectionWhite>
      <SectionWhite className='mt-4'>
        <SectionGray>ĐÁNH GIÁ SẢN PHẨM</SectionGray>
        <Review reviews={productInfo.reviews} />
      </SectionWhite>
      {relatedProduct?.length > 0 && (
        <ProductGrid title='SẢN PHẨM TƯƠNG TỰ' products={relatedProduct} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
