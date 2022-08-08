import { userAPI } from "apis/userAPI";
import { Button } from "components/button";
import { ICurrentUser } from "interfaces";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import { formatDateVN } from "utils/helper";
import UserAvatar from "./UserAvatar";

const UserManage = () => {
  const [users, setUsers] = useState<ICurrentUser[]>([]);
  console.log("users: ", users);
  const fetchAllUser = async () => {
    try {
      const { data } = await userAPI.getAllUser();
      setUsers(data.users);
    } catch (error) {
      console.log("Failed to fetch categories: ", error);
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
                  <div className='flex gap-x-2'>
                    <Button>Sửa</Button>
                    <Button>Xóa</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HeaderTemplate>
  );
};

export default UserManage;
