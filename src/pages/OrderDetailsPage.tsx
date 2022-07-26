import { OrderStatusVietnamese } from "@types";
import { orderAPI } from "apis";
import Loading from "components/Loading";
import OrderCancel from "modules/Order/OrderCancel";
import OrderInfomation from "modules/Order/OrderInfomation";
import OrderPayment from "modules/Order/OrderPayment";
import OrderReviews from "modules/Order/OrderReviews";
import OrderShippingProgress from "modules/Order/OrderShippingProgress";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const OrderDetailsPage = () => {
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
        <title>Chi tiết đơn hàng</title>
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
      <OrderCancel status={orderDetails.status} refetch={refetch} />
      <OrderReviews orderItems={orderDetails.orderItems} />
      <OrderPayment
        promotion={orderDetails.promotion}
        shippingFee={orderDetails.shippingFee}
        totalPayment={orderDetails.total}
        totalProductsPrice={orderDetails.price}
      />
    </>
  );
};

export default OrderDetailsPage;
