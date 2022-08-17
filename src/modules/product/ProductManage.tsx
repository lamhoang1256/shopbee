import { IPagination, IProduct } from "@types";
import { productAPI } from "apis";
import { Button } from "components/button";
import { Input } from "components/input";
import { Loading } from "components/loading";
import { Pagination } from "components/pagination";
import { path } from "constants/path";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatMoney, scrollToTop } from "utils/helper";
import ProductImage from "./ProductImage";
import ProductNotFound from "./ProductNotFound";
import ProductPriceSale from "./ProductPriceSale";

const ProductManage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      setSearchParams(values);
    },
  });

  const fetchAllProduct = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAllProduct({ ...params, limit: "10" });
      setProducts(data?.products);
      setPagination(data.pagination);
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
    scrollToTop();
  }, [searchParams]);

  return (
    <HeaderTemplate
      label='Quản lí sản phẩm'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className='flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1'
      >
        <Input
          name='name'
          className='w-full lg:!h-12'
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder='Tìm kiếm sản phẩm theo tên'
        />
        <Button primary className='flex-shrink-0 lg:h-12'>
          Tìm kiếm
        </Button>
      </form>
      {loading && <Loading />}
      {!loading && products.length > 0 && (
        <>
          <div className='tables'>
            <table>
              <thead className=''>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Số lượng</th>
                  <th>Giá gốc</th>
                  <th>Giá khuyến mãi</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td className='w-[300px]'>
                      <p className='!whitespace-pre-line line-clamp-2'>{product.name}</p>
                    </td>
                    <td>
                      <ProductImage
                        imageUrl={product.image}
                        className='border rounded w-14 h-14 border-slate-200'
                      />
                    </td>
                    <td>{product.stock}</td>
                    <td>{formatMoney(product.oldPrice)}</td>
                    <td>
                      <ProductPriceSale className='text-sm'>
                        {formatMoney(product.price)}
                      </ProductPriceSale>
                    </td>
                    <td>
                      <div className='flex gap-x-1'>
                        <Button to={`${path.productUpdate}/${product._id}`}>Sửa</Button>
                        <Button onClick={() => handleDeleteProduct(product._id)}>Xóa</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pagination={pagination} />
        </>
      )}
      {!loading && products.length === 0 && <ProductNotFound />}
    </HeaderTemplate>
  );
};

export default ProductManage;
