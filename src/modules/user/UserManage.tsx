import { userAPI } from "apis/userAPI";
import { Button } from "components/button";
import { Loading } from "components/loading";
import { path } from "constants/path";
import { ICurrentUser } from "interfaces";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDateVN } from "utils/helper";
import UserAvatar from "./UserAvatar";

const UserManage = () => {
  const [users, setUsers] = useState<ICurrentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const { data } = await userAPI.getAllUser();
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch categories: ", error);
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
  }, []);

  return (
    <HeaderTemplate
      label='Quản lí người dùng'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      {loading && <Loading />}
      {!loading && (
        <div className='tables'>
          <table>
            <thead className='border-b bg-gray-50'>
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
                        <h3 className='font-medium max-w-[140px] line-clamp-1'>{user.fullname}</h3>
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
                      {user.addressAdministrative?.split(",").slice(-1)[0]}
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
      )}
    </HeaderTemplate>
  );
};

export default UserManage;
