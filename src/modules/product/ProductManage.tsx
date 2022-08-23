import { productAPI } from "apis";
import { Button } from "components/button";
import { Input } from "components/input";
import { Loading } from "components/loading";
import { Pagination } from "components/pagination";
import { path } from "constants/path";
import { useFormik } from "formik";
import useFetchProducts from "hooks/useFetchProducts";
import { Template } from "layouts";
import { toast } from "react-toastify";
import { formatMoney } from "utils/helper";
import { PriceSale } from "components/price";
import ProductImage from "./ProductImage";
import ProductNotFound from "./ProductNotFound";

const ProductManage = () => {
  const { products, loading, pagination, fetchProducts, setSearchParams } = useFetchProducts();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      setSearchParams(values);
    },
  });

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { message } = await productAPI.deleteProduct(productId);
      toast.success(message);
      fetchProducts();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Template label='Quản lí sản phẩm' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
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
                      <PriceSale className='text-sm'>{product.price}</PriceSale>
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
    </Template>
  );
};

export default ProductManage;
