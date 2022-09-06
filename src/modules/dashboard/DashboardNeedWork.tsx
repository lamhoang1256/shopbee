import { IDashboardOverview } from "@types";
import { shopAPI } from "apis";
import { Loading } from "components/loading";
import { PATH } from "constants/path";
import { Template } from "layouts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { formatCash } from "utils/helper";

const DashboardNeedWork = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<IDashboardOverview>(Object);
  useEffect(() => {
    const fetchOverviewDashboard = async () => {
      try {
        setLoading(true);
        const { data } = await shopAPI.getOverviewDashboard();
        setOverview(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOverviewDashboard();
  }, []);

  const works = [
    {
      label: "Chờ xác nhận",
      value: overview.totalOrdersWaiting || 0,
      path: `${PATH.orderManage}`,
    },
    {
      label: "Đang xử lí",
      value: overview.totalOrdersProcessing || 0,
      path: `${PATH.orderManage}?status=processing`,
    },
    {
      label: "Đang giao hàng",
      value: overview.totalOrdersShipping || 0,
      path: `${PATH.orderManage}?status=shipping`,
    },
    {
      label: "Đã giao hàng",
      value: overview.totalOrdersDelivered || 0,
      path: `${PATH.orderManage}?status=delivered`,
    },
    {
      label: "Đơn hủy",
      value: overview.totalOrdersCanceled || 0,
      path: `${PATH.orderManage}?status=canceled`,
    },
    {
      label: "Đơn hàng",
      value: overview.totalOrders || 0,
      path: `${PATH.orderManage}`,
    },
    {
      label: "Số lượng sản phẩm",
      value: overview.totalProducts || 0,
      path: `${PATH.productManage}`,
    },
    {
      label: "Số lượng người dùng",
      value: overview.totalUsers || 0,
      path: `${PATH.userManage}`,
    },
    {
      label: "Số lượng voucher",
      value: overview.totalVouchers || 0,
      path: `${PATH.voucherManage}`,
    },
    {
      label: "Doanh thu",
      value: formatCash(overview.totalRevenue) || 0,
      path: `${PATH.orderManage}`,
    },
  ];

  return (
    <Template title='Danh sách cần làm' desc='Những việc bạn sẽ phải làm'>
      {loading && <Loading />}
      {!loading && (
        <div className='grid grid-cols-2 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-2'>
          {works.map((work) => (
            <Link
              key={work.label}
              to={work.path}
              className='flex p-2 flex-col items-center justify-center hover:bg-[#0000000a] duration-100 rounded transition-all'
            >
              <span className='text-[#2673dd] text-lg font-medium'>{work.value}</span>
              <span>{work.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Template>
  );
};

export default DashboardNeedWork;
