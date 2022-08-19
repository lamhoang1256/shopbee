import { IOrder, IProduct, OrderStatusCodeEnum } from "@types";
import { orderAPI } from "apis";
import { Button } from "components/button";
import { Loading } from "components/loading";
import { ModalAddReview, ModalUpdateReview } from "components/modal";
import { orderStatusLabel } from "constants/global";
import {
  OrderHeader,
  OrderOverview,
  OrderPayment,
  OrderProduct,
  OrderProgress,
} from "modules/order";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { scrollToTop } from "utils/helper";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder>(Object);
  const [loading, setLoading] = useState(true);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [productReview, setProductReview] = useState<IProduct>(Object);
  const { currentUser } = useStore((state) => state);

  const openModalAdd = (product: IProduct) => {
    setShowModalAdd(true);
    setProductReview(product);
  };
  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  const openModalUpdate = (product: IProduct) => {
    setShowModalUpdate(true);
    setProductReview(product);
  };
  const closeModalUpdate = () => {
    setShowModalUpdate(false);
  };

  const fetchDetailsOrder = async () => {
    setLoading(true);
    try {
      const { data } = await orderAPI.getSingleOrder(id || "");
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleCancelOrder = async () => {
    try {
      const { message, success } = await orderAPI.cancelOrder(id || "");
      if (success) {
        fetchDetailsOrder();
        toast.success(message);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetailsOrder();
    scrollToTop(0);
  }, [id]);
  if (loading) return <Loading />;
  const payments = [
    {
      label: "Tổng tiền hàng",
      value: order.price,
    },
    {
      label: "Phí vận chuyển",
      value: order.shippingFee,
    },
    {
      label: "Voucher từ Shopbee",
      value: order.promotion * -1,
    },
    {
      label: "Tổng thanh toán",
      value: order.price + order.shippingFee - order.promotion,
    },
  ];

  return (
    <>
      <div className='px-4 py-5 bg-white rounded-md'>
        <OrderHeader id={order._id}>{orderStatusLabel[order.statusCode]}</OrderHeader>
        <OrderProgress order={order} />
        <OrderOverview order={order} />
      </div>
      <div className='bg-[#fafdff] p-3 flex gap-y-3 md:justify-between flex-col md:flex-row border-dotted border border-[rgba(0,0,0,.09)]'>
        <span className='leading-10 text-xs text-[#0000008a]'>
          Cảm ơn bạn đã mua sắm tại Shopbee!
        </span>
        <div className='flex flex-wrap gap-2'>
          {order.statusCode !== OrderStatusCodeEnum.delivered &&
            order.statusCode !== OrderStatusCodeEnum.canceled && (
              <Button primary onClick={handleCancelOrder}>
                Hủy đơn hàng
              </Button>
            )}
        </div>
      </div>
      <div className='p-4 mt-4 bg-white rounded-md'>
        {order?.orderItems.map((orderItem) => {
          const existReview = orderItem.product.reviews?.find(
            (review) => review.user._id === currentUser._id,
          );
          return (
            <div className='my-3' key={orderItem.product._id}>
              <OrderProduct order={orderItem} />
              {existReview?._id ? (
                <Button onClick={() => openModalUpdate(orderItem.product)}>
                  Chỉnh sửa nhận xét
                </Button>
              ) : (
                <Button onClick={() => openModalAdd(orderItem.product)}>Viết nhận xét</Button>
              )}
            </div>
          );
        })}
      </div>
      <OrderPayment payments={payments} />
      <ModalAddReview
        isOpen={showModalAdd}
        closeModal={closeModalAdd}
        product={productReview}
        fetchDetailsOrder={fetchDetailsOrder}
      />
      <ModalUpdateReview
        isOpen={showModalUpdate}
        closeModal={closeModalUpdate}
        product={productReview}
      />
    </>
  );
};

export default OrderDetailsPage;
