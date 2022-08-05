/* eslint-disable @typescript-eslint/no-unused-vars */
import { configAPI } from "apis/configAPI";
import { Button, ButtonAddToCart } from "components/button";
import { SectionGray, SectionHeader } from "components/common";
import { IconCartOutline } from "components/icons";
import { Loading } from "components/loading";
import { QuantityController } from "components/quantityController";
import { ICart, IProduct } from "interfaces";
import {
  ProductDesc,
  ProductImage,
  ProductItem,
  ProductLabelSale,
  ProductPriceOld,
  ProductPriceSale,
  ProductRating,
  ProductSold,
  ProductTitle,
} from "modules/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { formatMoney } from "utils/helper";
import PageNotFound from "./PageNotFound";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const currentUser = useStore((state: any) => state.currentUser);
  const setCart = useStore((state: any) => state.setCart);
  const carts: ICart[] = useStore((state: any) => state.carts);
  const [productInfo, setProductInfo] = useState<IProduct>(Object);
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantityAdd, setQuantityAdd] = useState(1);
  const handleChangeQuantityController = (value: number) => {
    setQuantityAdd(() => value);
  };

  const fetchRelatedProduct = async (params: { category: string }) => {
    try {
      const { data } = await configAPI.getAllProduct(params);
      setRelatedProduct(data.products);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const { data, success } = await configAPI.getSingleProduct(id || "");
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
  useEffect(() => {
    fetchProductDetail();
  }, [id]);
  if (!id) return <PageNotFound />;
  if (loading) return <Loading />;
  if (!productInfo.name) return <div className='layout-container'>Product not exist</div>;

  const percentSale = Math.ceil(100 - (productInfo.priceSale / productInfo.price) * 100);
  const handleAddToCart = async () => {
    let quantity = quantityAdd;
    const existCartItem = carts?.find((cart) => cart.product._id === id);
    if (existCartItem) {
      quantity = existCartItem.quantity + quantityAdd;
      existCartItem.quantity += quantityAdd;
    }
    const values = {
      userId: currentUser?._id,
      productId: id,
      quantity,
    };

    try {
      const { message, success, data } = await configAPI.addToCart(values);
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
        <div className='flex flex-col p-4 mt-6 bg-white gap-y-6 lg:flex-row gap-x-5'>
          <div className='flex-shrink-0 lg:w-[400px]'>
            <ProductImage imageUrl={productInfo.image} />
          </div>
          <div>
            <ProductTitle className='text-[#242424] text-2xl'>{productInfo.name}</ProductTitle>
            <div className='flex items-center my-4 gap-x-3'>
              <span className='font-medium'>{productInfo.rating}</span>
              <ProductRating rating={productInfo.rating} />
              <ProductSold className='pl-4 border-l border-[#00000024]'>
                {productInfo.sold}
              </ProductSold>
            </div>
            <SectionGray className='flex flex-col-reverse md:flex-row gap-y-1 md:items-center gap-x-3'>
              <ProductPriceOld className='text-[#929292]'>
                {formatMoney(productInfo.price)}
              </ProductPriceOld>
              <ProductPriceSale className='text-3xl font-medium'>
                {formatMoney(productInfo.priceSale)}
              </ProductPriceSale>
              <ProductLabelSale>-{percentSale}%</ProductLabelSale>
            </SectionGray>
            <div className='text-sm px-3 py-2 border border-[#eeeeee] my-3 rounded-lg'>
              <h4 className='font-medium text-[#00ab56]'>Thứ 6, 27/09</h4>
              <span>18.000đ (Freeship 10K đh 149K)</span>
            </div>
            <div className='flex flex-col mt-6 gap-y-2 md:items-center md:flex-row gap-x-4'>
              <span>Số lượng</span>
              <QuantityController onChangeValue={handleChangeQuantityController} />
              <span>{productInfo.quantity} sản phẩm có sẵn</span>
            </div>
            <div className='flex items-center mt-6 gap-x-2'>
              <ButtonAddToCart className='h-12' onClick={handleAddToCart}>
                <IconCartOutline className='w-4 h-4 mr-2' />
                <span className='text-sm'>Thêm vào giỏ hàng</span>
              </ButtonAddToCart>
              <Button primary className='h-12 rounded-sm'>
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
        <div className='p-4 mt-6 bg-white layout-container'>
          <SectionGray>MÔ TẢ SẢN PHẨM</SectionGray>
          <ProductDesc description={productInfo.description} />
        </div>
      </section>
      {relatedProduct?.length > 0 && (
        <div className='mt-5'>
          <h3 className='text-[#0000008a] text-base font-medium'>SẢN PHẨM TƯƠNG TỰ</h3>
          <div className='my-3 grid-product'>
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
