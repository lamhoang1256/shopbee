/* eslint-disable @typescript-eslint/naming-convention */
import { productAPI } from "apis";
import { ActionDelete } from "components/action";
import { Loading } from "components/loading";
import { path } from "constants/path";
import { IProduct } from "interfaces";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { formatCash, formatMoney } from "utils/helper";
import ProductImage from "./ProductImage";
import ProductPriceSale from "./ProductPriceSale";
import ProductRating from "./ProductRating";
import ProductTitle from "./ProductTitle";

const ProductManage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchAllProduct = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAllProduct();
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { success, message } = await productAPI.deleteProduct(productId);
      if (success) {
        toast.success(message);
        fetchAllProduct();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <HeaderTemplate
      label='Quản lí sản phẩm'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      {loading && <Loading />}
      {!loading && (
        <div className='gap-3 my-3 product-grid'>
          {products?.map((product) => {
            const { priceSale, image, _id, name, rating, sold } = product;
            return (
              <Link
                to={`${path.productUpdate}/${_id}`}
                className='relative bg-white shadow-product'
                key={_id}
              >
                <ProductImage imageUrl={image} />
                <div className='p-2 pb-4'>
                  <ProductTitle>{name}</ProductTitle>
                  <div className='flex flex-col my-1 gap-x-2 gap-y-1 md:items-center md:flex-row'>
                    <ProductRating rating={rating} size='w-[14px] h-[14px]' />
                    <span className='text-[#787878] text-xs'>Đã bán {formatCash(sold)}</span>
                  </div>
                  <ProductPriceSale>{formatMoney(priceSale)}</ProductPriceSale>
                </div>
                <ActionDelete onClick={() => handleDeleteProduct(_id)} className='!w-5 !h-5' />
              </Link>
            );
          })}
        </div>
      )}
    </HeaderTemplate>
  );
};

export default ProductManage;
