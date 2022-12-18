import { userAPI } from "apis";
import Button from "components/Button";
import Input from "components/Input";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import { defaultUserAvatar } from "constants/global";
import { PATH } from "constants/path";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateVN } from "utils/helper";
import { sweetAlertDelete } from "utils/sweetalert2";

const UserManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  const email = queryParams?.email as string;
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => {
      setSearchParams(values);
    }
  });
  const { values, handleSubmit, handleChange } = formik;
  const queryClient = useQueryClient();
  const { isLoading, data: usersData } = useQuery({
    queryKey: ["users", email],
    queryFn: () => userAPI.getAllUser({ ...queryParams, limit: 10 }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  const deleteProductMutation = useMutation({
    mutationFn: (usedId: string) => userAPI.deleteUser(usedId)
  });
  const handleDeleteUser = (userId: string) => {
    sweetAlertDelete(() =>
      deleteProductMutation.mutate(userId, {
        onSuccess: ({ message }) => {
          toast.success(message);
          queryClient.invalidateQueries({ queryKey: ["users", email], exact: true });
        },
        onError(error: any) {
          toast.error(error.message);
        }
      })
    );
  };
  return (
    <Template title="Quản lí người dùng" desc="Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn">
      <Helmet>
        <title>Quản lí người dùng</title>
      </Helmet>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1"
      >
        <Input
          name="email"
          className="w-full lg:!h-12"
          value={values.email}
          onChange={handleChange}
          placeholder="Tìm kiếm người dùng theo email"
        />
        <Button primary className="flex-shrink-0 lg:h-12">
          Tìm kiếm
        </Button>
      </form>
      {isLoading && <Loading />}
      {!isLoading && usersData && usersData?.data.users.length > 0 && (
        <div>
          <div className="tables">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thông tin khách hàng</th>
                  <th>Địa chỉ email</th>
                  <th>Số điện thoại</th>
                  <th>Khu vực</th>
                  <th>Quyền</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {usersData.data.users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-x-2">
                        <img
                          alt={user.fullname}
                          className="w-10 h-10 border border-gray-200 rounded-full"
                          src={user.avatar || defaultUserAvatar}
                        />
                        <div>
                          <h3 className="font-medium max-w-[140px] line-clamp-1">
                            {user.fullname || "Khách hàng"}
                          </h3>
                          <span>{formatDateVN(user.createdAt)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="max-w-[180px] line-clamp-1">{user.email}</span>
                    </td>
                    <td>{user.phone}</td>
                    <td>
                      <span className="max-w-[180px] line-clamp-1">
                        {user.address?.split(",").slice(-1)[0]}
                      </span>
                    </td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <div className="flex gap-x-1">
                        <Button to={`${PATH.userUpdate}/${user._id}`}>Sửa</Button>
                        <Button onClick={() => handleDeleteUser(user._id)}>Xóa</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pagination={usersData.data.pagination} />
        </div>
      )}
      {!isLoading && usersData && usersData?.data.users.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-y-2 h-[400px]">
          <img src="/product-notfound.png" alt="not found product" />
          <span className="text-[#bababa]">Không tìm thấy người dùng</span>
        </div>
      )}
    </Template>
  );
};

export default UserManage;
