import { ICurrentUser, IPagination } from "@types";
import { userAPI } from "apis";
import { Button } from "components/button";
import { Input } from "components/input";
import { Loading } from "components/loading";
import { Pagination } from "components/pagination";
import { path } from "constants/path";
import { useFormik } from "formik";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateVN, scrollToTop } from "utils/helper";
import UserAvatar from "./UserAvatar";

const UserManage = () => {
  const [users, setUsers] = useState<ICurrentUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>(Object);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [loading, setLoading] = useState(true);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setSearchParams(values);
    },
  });

  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const { data } = await userAPI.getAllUser({ ...params, limit: "10" });
      setUsers(data.users);
      setPagination(data.pagination);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch users: ", error);
    }
  };

  const handleDeleteUser = async (usedId: string) => {
    try {
      const { success, message } = await userAPI.deleteUser(usedId);
      if (success) {
        toast.success(message);
        fetchAllUser();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchAllUser();
    scrollToTop();
  }, [searchParams]);

  return (
    <Template label='Quản lí người dùng' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete='off'
        className='flex flex-wrap items-center my-4 sm:flex-nowrap gap-x-2 gap-y-1'
      >
        <Input
          name='email'
          className='w-full lg:!h-12'
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder='Tìm kiếm người dùng theo email'
        />
        <Button primary className='flex-shrink-0 lg:h-12'>
          Tìm kiếm
        </Button>
      </form>
      {loading && <Loading />}
      {!loading && users.length > 0 && (
        <>
          <div className='tables'>
            <table>
              <thead className=''>
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
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className='flex items-center gap-x-2'>
                        <UserAvatar className='w-8 h-8 rounded-full' urlAvatar={user.avatar} />
                        <div>
                          <h3 className='font-medium max-w-[140px] line-clamp-1'>
                            {user.fullname}
                          </h3>
                          <span>{formatDateVN(user.createdAt)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='max-w-[180px] line-clamp-1'>{user.email}</span>
                    </td>
                    <td>{user.phone}</td>
                    <td>
                      <span className='max-w-[180px] line-clamp-1'>
                        {user.address?.split(",").slice(-1)[0]}
                      </span>
                    </td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <div className='flex gap-x-1'>
                        <Button to={`${path.userUpdate}/${user._id}`}>Sửa</Button>
                        <Button onClick={() => handleDeleteUser(user._id)}>Xóa</Button>
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
      {!loading && users.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-y-2 h-[400px]'>
          <img src='/images/no-product-found.png' alt='not found product' />
          <span className='text-[#bababa]'>Không tìm thấy người dùng</span>
        </div>
      )}
    </Template>
  );
};

export default UserManage;
