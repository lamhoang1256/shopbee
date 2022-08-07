import { configAPI } from "apis/configAPI";
import { productAPI } from "apis/product";
import { Button } from "components/button";
import { Loading } from "components/loading";
import { path } from "constants/path";
import { IProduct } from "interfaces";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatMoney } from "utils/helper";
import ProductImage from "./ProductImage";
import ProductPriceSale from "./ProductPriceSale";
import ProductTitle from "./ProductTitle";

const ProductManage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchAllProduct = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.getAllProduct();
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch all product: ", error);
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
        <div className='my-3 product-grid'>
          {products?.map((product) => (
            <div className='bg-white transitio shadow-product ' key={product._id}>
              <ProductImage imageUrl={product.image} className='p-2' />
              <div className='p-[6px]'>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPriceSale>{formatMoney(product.priceSale)}</ProductPriceSale>
              </div>
              <div className='grid grid-cols-2 gap-1'>
                <Button className='w-full py-1' onClick={() => handleDeleteProduct(product._id)}>
                  Xóa
                </Button>
                <Button to={`${path.productUpdate}/${product._id}`} className='w-full py-1'>
                  Sửa
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </HeaderTemplate>
  );
};

export default ProductManage;
