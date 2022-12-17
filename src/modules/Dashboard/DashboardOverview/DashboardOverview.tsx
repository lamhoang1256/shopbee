import { shopAPI } from "apis";
import Loading from "components/Loading";
import { PATH } from "constants/path";
import Template from "layouts/Template";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { formatCash } from "utils";

const DashboardOverview = () => {
  const { isLoading, data: overviewDataData } = useQuery({
    queryKey: ["shopoverviewDataData?.data"],
    queryFn: () => shopAPI.getShopOverview(),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  const works = [
    {
      label: "Chờ xác nhận",
      value: overviewDataData?.data.totalOrdersWaiting || 0,
      path: `${PATH.orderManage}`
    },
    {
      label: "Đang xử lí",
      value: overviewDataData?.data.totalOrdersProcessing || 0,
      path: `${PATH.orderManage}?status=processing`
    },
    {
      label: "Đang giao hàng",
      value: overviewDataData?.data.totalOrdersShipping || 0,
      path: `${PATH.orderManage}?status=shipping`
    },
    {
      label: "Đã giao hàng",
      value: overviewDataData?.data.totalOrdersDelivered || 0,
      path: `${PATH.orderManage}?status=delivered`
    },
    {
      label: "Đơn hủy",
      value: overviewDataData?.data.totalOrdersCanceled || 0,
      path: `${PATH.orderManage}?status=canceled`
    },
    {
      label: "Đơn hàng",
      value: overviewDataData?.data.totalOrders || 0,
      path: `${PATH.orderManage}`
    },
    {
      label: "Số lượng sản phẩm",
      value: overviewDataData?.data.totalProducts || 0,
      path: `${PATH.productManage}`
    },
    {
      label: "Số lượng người dùng",
      value: overviewDataData?.data.totalUsers || 0,
      path: `${PATH.userManage}`
    },
    {
      label: "Số lượng voucher",
      value: overviewDataData?.data.totalVouchers || 0,
      path: `${PATH.voucherManage}`
    },
    {
      label: "Doanh thu",
      value: formatCash(overviewDataData?.data.totalRevenue || 0),
      path: `${PATH.orderManage}`
    }
  ];

  return (
    <Template title="Danh sách cần làm" desc="Những việc bạn sẽ phải làm">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="grid grid-cols-2 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-2">
          {works.map((work) => (
            <Link
              key={work.label}
              to={work.path}
              className="flex p-2 flex-col items-center justify-center hover:bg-[#0000000a] duration-100 rounded transition-all"
            >
              <span className="text-[#2673dd] text-lg font-medium">{work.value}</span>
              <span>{work.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Template>
  );
};

export default DashboardOverview;
