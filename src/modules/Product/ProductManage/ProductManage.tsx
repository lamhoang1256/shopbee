import { productAPI } from "apis";
import Button from "components/Button";
import Image from "components/Image";
import Input from "components/Input";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import useQueryParams from "hooks/useQueryParams";
import Template from "layouts/Template";
import ProductNotFound from "modules/Product/ProductNotFound";
import { ProductPriceSale } from "modules/Product/ProductPrice";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { formatMoney, sweetAlertDelete } from "utils";

const ProductManage = () => {
  const { queryParams, setSearchParams } = useQueryParams();
  const name = queryParams?.name || "";
  const queryClient = useQueryClient();
  const { isLoading, data: productsData } = useQuery({
    queryKey: ["products", name],
    queryFn: () => productAPI.getAllProduct(queryParams),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => productAPI.deleteProduct(productId),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["products", name], exact: true });
    },
    onError(error: any) {
      toast.error(error.message);
    }
  });
  const formik = useFormik({
    initialValues: { name: "" },
    onSubmit: (values) => {
      setSearchParams(values);
    }
  });
  return (
    <Template title="Quản lí sản phẩm" desc="Thêm, xóa, sửa các sản phẩm của bạn">
      <Helmet>
        <title>Quản lí sản phẩm</title>
      </Helmet>
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1"
      >
        <Input
          name="name"
          className="w-full lg:!h-12"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Tìm kiếm sản phẩm theo tên"
        />
        <Button primary className="flex-shrink-0 lg:h-12">
          Tìm kiếm
        </Button>
      </form>
      {isLoading && <Loading />}
      {!isLoading && productsData && (
        <div>
          <div className="tables">
            <table>
              <thead>
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
                {productsData?.data.products?.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td className="w-[300px]">
                      <p className="!whitespace-pre-line line-clamp-2">{product.name}</p>
                    </td>
                    <td>
                      <Image
                        alt={product.name}
                        src={product.image}
                        className="border rounded w-14 h-14 border-slate-200"
                      />
                    </td>
                    <td>{product.stock}</td>
                    <td>{formatMoney(product.oldPrice)}</td>
                    <td>
                      <ProductPriceSale className="text-sm">{product.price}</ProductPriceSale>
                    </td>
                    <td>
                      <div className="flex gap-x-1">
                        <Button to={`${PATH.productUpdate}/${product._id}`}>Sửa</Button>
                        <Button
                          onClick={() =>
                            sweetAlertDelete(() => deleteProductMutation.mutate(product._id))
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pagination={productsData.data.pagination} />
        </div>
      )}
      {!isLoading && !productsData && <ProductNotFound />}
    </Template>
  );
};

export default ProductManage;
