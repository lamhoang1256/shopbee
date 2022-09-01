import { categoryAPI } from "apis";
import { Button } from "components/button";
import { Loading } from "components/loading";
import { PATH } from "constants/path";
import useFetchCategories from "hooks/useFetchCategories";
import { Template } from "layouts";
import { toast } from "react-toastify";
import { swalDelete } from "utils/swal";

const CategoryManage = () => {
  const { categories, loading, fetchCategories } = useFetchCategories();
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const { message } = await categoryAPI.deleteCategory(categoryId);
      toast.success(message);
      fetchCategories();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Template title='Quản lí danh mục' desc='Vui lòng nhập đầy đủ thông tin cho danh mục của bạn'>
      {loading && <Loading />}
      {!loading && categories.length > 0 && (
        <div className='tables'>
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
              {categories?.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td className='w-[300px]'>
                    <p className='!whitespace-pre-line line-clamp-2'>{category.name}</p>
                  </td>
                  <td>
                    <img
                      src={category.image}
                      alt={category.slug}
                      className='border rounded w-14 h-14 border-slate-200'
                    />
                  </td>
                  <td>{category.slug}</td>
                  <td>
                    <div className='flex gap-x-1'>
                      <Button to={`${PATH.categoryUpdate}/${category._id}`}>Sửa</Button>
                      <Button onClick={() => swalDelete(() => handleDeleteCategory(category._id))}>
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && categories.length === 0 && <span>Không tìm thấy danh mục</span>}
    </Template>
  );
};

export default CategoryManage;
