import { IOrderItem, IProduct, IReview } from "@types";
import { reviewAPI } from "apis";
import { Button } from "components/button";
import { ModalAddReview, ModalUpdateReview } from "components/modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import OrderProduct from "./OrderProduct";

interface OrderReviewProps {
  orderItems: IOrderItem[];
}

const OrderReview = ({ orderItems }: OrderReviewProps) => {
  const { id = "" } = useParams();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [productReview, setProductReview] = useState<IProduct>(Object);
  const [dataReview, setDataReview] = useState<IReview>();

  const openModalAdd = (product: IProduct) => {
    setShowModalAdd(true);
    setProductReview(product);
  };
  const closeModalAdd = () => {
    setShowModalAdd(false);
  };
  const openModalUpdate = (product: IProduct, review: IReview) => {
    setShowModalUpdate(true);
    setProductReview(product);
    setDataReview(review);
  };
  const closeModalUpdate = () => {
    setShowModalUpdate(false);
  };
  const fetchReviews = async () => {
    try {
      const { data } = await reviewAPI.getAllReviewOrder(id);
      setReviews(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteReview = async (orderId: string) => {
    try {
      const { message } = await reviewAPI.deleteReview(orderId);
      fetchReviews();
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [id]);

  return (
    <div className='p-4 mt-4 bg-white rounded-md'>
      {orderItems.map((orderItem) => {
        const { product } = orderItem;
        const myReview = reviews?.find((review) => review.productId === product._id);
        return (
          <div className='my-3' key={orderItem.product._id}>
            <OrderProduct order={orderItem} />
            {myReview?._id ? (
              <div className='flex gap-x-2'>
                <Button onClick={() => openModalUpdate(product, myReview)}>
                  Chỉnh sửa nhận xét
                </Button>
                <Button onClick={() => handleDeleteReview(myReview._id)}>Xóa nhận xét</Button>
              </div>
            ) : (
              <Button onClick={() => openModalAdd(product)}>Viết nhận xét</Button>
            )}
          </div>
        );
      })}
      <ModalAddReview
        isOpen={showModalAdd}
        closeModal={closeModalAdd}
        product={productReview}
        fetchReviews={fetchReviews}
      />
      {dataReview && (
        <ModalUpdateReview
          isOpen={showModalUpdate}
          closeModal={closeModalUpdate}
          productReview={productReview}
          dataReview={dataReview}
          fetchReviews={fetchReviews}
        />
      )}
    </div>
  );
};

export default OrderReview;
