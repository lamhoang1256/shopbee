import { categoryAPI } from "apis";
import Button from "components/Button";
import Loading from "components/Loading";
import { PATH } from "constants/path";
import Template from "layouts/Template";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { swalDelete } from "utils/sweetalert2";

const CategoryManage = () => {
  const queryClient = useQueryClient();
  const { isLoading, data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryAPI.getAllCategory(),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  });
  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => categoryAPI.deleteCategory(categoryId)
  });
  const handleDeleteCategory = (userId: string) => {
    swalDelete(() =>
      deleteCategoryMutation.mutate(userId, {
        onSuccess: ({ message }) => {
          toast.success(message);
          queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError(error: any) {
          toast.error(error.message);
        }
      })
    );
  };
  return (
    <Template title="Quản lí danh mục" desc="Thêm, xóa, sửa các danh mục sản phẩm">
      <Helmet>
        <title>Quản lí danh mục</title>
      </Helmet>
      {isLoading && <Loading />}
      {!isLoading && categoriesData && categoriesData.data.length > 0 && (
        <div className="tables">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên danh mục</th>
                <th>Hình ảnh</th>
                <th>Slug</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.data?.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td className="w-[300px]">
                    <p className="!whitespace-pre-line line-clamp-2">{category.name}</p>
                  </td>
                  <td>
                    <img
                      src={category.image}
                      alt={category.slug}
                      className="border rounded w-14 h-14 border-slate-200"
                    />
                  </td>
                  <td>{category.slug}</td>
                  <td>
                    <div className="flex gap-x-1">
                      <Button to={`${PATH.categoryUpdate}/${category._id}`}>Sửa</Button>
                      <Button onClick={() => handleDeleteCategory(category._id)}>Xóa</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && categoriesData && categoriesData.data.length === 0 && (
        <span>Không tìm thấy danh mục</span>
      )}
    </Template>
  );
};

export default CategoryManage;
