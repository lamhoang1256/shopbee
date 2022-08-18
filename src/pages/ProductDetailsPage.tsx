import { ICity, IProduct, IShop } from "@types";
import { addressAPI, cartAPI, productAPI, shopAPI } from "apis";
import { Button, ButtonOutline } from "components/button";
import { SectionGray, SectionWhite } from "components/common";
import { IconCartOutline } from "components/icons";
import { Loading } from "components/loading";
import { QuantityController } from "components/quantityController";
import { Review } from "components/review";
import { Option, Select } from "components/select";
import {
  ProductDesc,
  ProductImage,
  ProductItem,
  ProductNotFound,
  ProductPriceOld,
  ProductPriceSale,
  ProductRating,
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
  const { setCart, carts, currentUser } = useStore((state) => state);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [citys, setCitys] = useState<ICity[]>([]);
  const [cityId, setCityId] = useState(currentUser.cityId);
  const [productInfo, setProductInfo] = useState<IProduct>(Object);
  const [shopInfo, setShopInfo] = useState<IShop>(Object);
  const [shippingFee, setShippingFee] = useState(0);
  const [quantityAdd, setQuantityAdd] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([]);

  const handleChangeQuantityController = (value: number) => {
    setQuantityAdd(() => value);
  };

  useEffect(() => {
    const fetchRelatedProduct = async (params: { category: string }) => {
      productAPI.getAllProduct(params).then((res) => setRelatedProduct(res.data.products));
    };
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const { data, success } = await productAPI.getSingleProduct(id || "");
        if (success) {
          const params = { category: data.category._id };
          fetchRelatedProduct(params);
          setProductInfo(data);
        }
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
      const { message, success, data } = await cartAPI.addToCart(values);
      if (!success) return;
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
      <section>
        <div className='flex flex-col gap-6 p-4 mt-6 bg-white lg:flex-row'>
          <div className='flex-shrink-0 lg:w-[400px]'>
            <ProductImage imageUrl={productInfo.image} />
          </div>
          <div>
            <ProductTitle className='text-[#242424] text-base lg:text-2xl'>
              {productInfo.name}
            </ProductTitle>
            <div className='flex items-center my-4 gap-x-3'>
              <span className='font-medium'>{productInfo.rating}</span>
              <ProductRating rating={productInfo.rating} />
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
                  name='city'
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
            <div className='flex flex-col gap-2 mt-6 md:flex-row md:items-center'>
              <ButtonOutline className='h-10 lg:h-12' onClick={handleAddToCart}>
                <IconCartOutline className='w-4 h-4 mr-2' />
                <span className='text-sm'>Thêm vào giỏ hàng</span>
              </ButtonOutline>
              <Button primary className='h-10 rounded-sm lg:h-12'>
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
        <SectionWhite className='mt-4'>
          <ShopOverview shopInfo={shopInfo} />
        </SectionWhite>
        <SectionWhite className='mt-4'>
          <SectionGray>MÔ TẢ SẢN PHẨM</SectionGray>
          <ProductDesc description={productInfo.description} />
        </SectionWhite>
        <SectionWhite className='mt-4'>
          <SectionGray>ĐÁNH GIÁ SẢN PHẨM</SectionGray>
          <Review reviews={productInfo.reviews} />
        </SectionWhite>
      </section>
      {relatedProduct?.length > 0 && (
        <div className='mt-5'>
          <h3 className='text-[#0000008a] text-base font-medium'>SẢN PHẨM TƯƠNG TỰ</h3>
          <div className='my-3 product-grid'>
            {relatedProduct?.map((product: IProduct) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
