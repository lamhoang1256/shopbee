import { OrderStatusVietnamese } from "@types";
import { orderAPI } from "apis";
import Loading from "components/Loading";
import OrderInfomation from "modules/Order/OrderInfomation";
import OrderPayment from "modules/Order/OrderPayment";
import OrderProduct from "modules/Order/OrderProduct";
import OrderShippingProgress from "modules/Order/OrderShippingProgress";
import OrderUpdateStatus from "modules/Order/OrderUpdateStatus";
import PageNotFound from "pages/PageNotFound";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const OrderUpdate = () => {
  const { id = "" } = useParams();
  const {
    isLoading,
    data: orderDetailsData,
    refetch
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => orderAPI.getSingleOrder(id),
    staleTime: 5 * 60 * 1000
  });
  if (isLoading) return <Loading />;
  const orderDetails = orderDetailsData?.data;
  if (!orderDetails) return <PageNotFound />;
  return (
    <>
      <Helmet>
        <title>Cập nhật đơn hàng</title>
      </Helmet>
      <div className="section-white">
        <div className="flex flex-col justify-between md:items-center md:flex-row">
          <h3 className="text-lg font-medium">Quản lí đơn hàng</h3>
          <div>
            ID ĐƠN HÀNG: {orderDetails._id} |{" "}
            <span className="uppercase text-orangeee4">
              {OrderStatusVietnamese[orderDetails.status]}
            </span>
          </div>
        </div>
        <OrderShippingProgress orderDetails={orderDetails} />
        <OrderInfomation orderDetails={orderDetails} />
      </div>
      <OrderUpdateStatus refetch={refetch} />
      <div className="mt-3 section-white">
        {orderDetails?.orderItems.map((orderItem) => (
          <OrderProduct order={orderItem} key={orderItem.product._id} />
        ))}
      </div>
      <OrderPayment
        totalProductsPrice={orderDetails.price}
        shippingFee={orderDetails.shippingFee}
        promotion={orderDetails.promotion}
        totalPayment={orderDetails.total}
      />
    </>
  );
};

export default OrderUpdate;
