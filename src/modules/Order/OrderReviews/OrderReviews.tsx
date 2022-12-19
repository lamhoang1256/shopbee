import { IOrderItem, IPayloadReview, IProduct, IReview } from "@types";
import { reviewAPI } from "apis";
import Button from "components/Button";
import Image from "components/Image";
import Rating from "components/Rating";
import Textarea from "components/Textarea";
import { PATH } from "constants/path";
import useModal from "hooks/useModal";
import SelectStar from "modules/Common/SelectStar";
import OrderProduct from "modules/Order/OrderProduct";
import { useState } from "react";
import Modal from "react-modal";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateVNFull, sweetAlertDelete } from "utils";

interface OrderReviewProps {
  orderItems: IOrderItem[];
}

const OrderReview = ({ orderItems }: OrderReviewProps) => {
  const { id = "" } = useParams();
  const { isShow: isShowAdd, toggleModal: toggleModalAdd } = useModal();
  const { isShow: isShowUpdate, toggleModal: toggleModalUpdate } = useModal();
  const [productReview, setProductReview] = useState<IProduct>(Object);
  const [dataReview, setDataReview] = useState<IReview>(Object);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: reviewsData, refetch } = useQuery({
    queryKey: ["orderReviews", id],
    queryFn: () => reviewAPI.getAllReviewOrder(id),
    staleTime: 5 * 60 * 1000
  });
  const openModalAdd = (product: IProduct) => {
    toggleModalAdd();
    setProductReview(product);
  };
  const openModalUpdate = (review: IReview) => {
    const orderItem = orderItems.find((item) => item.product._id === review.productId);
    if (!orderItem) return;
    toggleModalUpdate();
    setProductReview(orderItem.product);
    setComment(review.comment);
    setDataReview(review);
  };

  const addReviewMutation = useMutation({
    mutationFn: (payload: IPayloadReview) => reviewAPI.addNewReview(payload)
  });
  const handleAddNewReview = async () => {
    if (comment === "") {
      toast.error("Vui lòng thêm nhận xét");
      return;
    }
    if (rating === 0) {
      toast.error("Vui lòng chọn điểm đánh giá");
      return;
    }
    const payload = { rating, comment, productId: productReview._id, orderId: id };
    addReviewMutation.mutate(payload, {
      onSuccess: ({ message }) => {
        toast.success(message);
        refetch();
      },
      onError(error: any) {
        toast.error(error?.message);
      },
      onSettled() {
        setRating(0);
        setComment("");
        toggleModalAdd();
      }
    });
  };

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: string) => reviewAPI.deleteReview(reviewId)
  });
  const handleDeleteReview = (reviewId: string) => {
    sweetAlertDelete(() => {
      deleteReviewMutation.mutate(reviewId, {
        onSuccess: ({ message }) => {
          toast.success(message);
          refetch();
        },
        onError(error: any) {
          toast.error(error?.message);
        }
      });
    });
  };

  const updateReviewMutation = useMutation({
    mutationFn: (reviewId: string) => {
      const payload = {
        orderId: id,
        rating: dataReview.rating,
        comment: dataReview.comment,
        productId: productReview._id
      };
      return reviewAPI.updateReview(reviewId, payload);
    }
  });
  const handleUpdateReview = (reviewId: string) => {
    if (dataReview.comment === "") {
      toast.error("Vui lòng thêm nhận xét");
      return;
    }
    if (dataReview.rating === 0) {
      toast.error("Vui lòng chọn điểm đánh giá");
      return;
    }
    updateReviewMutation.mutate(reviewId, {
      onSuccess: ({ message }) => {
        toast.success(message);
        refetch();
      },
      onError(error: any) {
        toast.error(error?.message);
      },
      onSettled() {
        toggleModalUpdate();
      }
    });
  };

  const handleSelectRating = (ratingValue: number) => {
    setDataReview({ ...dataReview, rating: ratingValue });
  };

  return (
    <div className="p-4 mt-4 bg-white rounded-md">
      {orderItems.map((orderItem) => {
        return (
          <div className="my-3" key={orderItem.product._id}>
            <OrderProduct order={orderItem} />
            <Button onClick={() => openModalAdd(orderItem.product)}>Viết nhận xét</Button>
          </div>
        );
      })}
      {reviewsData?.data && reviewsData?.data.length > 0 && (
        <div>
          <h3 className="mt-5 mb-[6px] text-lg">Nhận xét sản phẩm của đơn hàng</h3>
          {reviewsData?.data.map((review) => {
            const reviewProduct = orderItems.find(
              (orderItem) => orderItem.product._id === review.productId
            )?.product;
            return (
              <div className="mb-4" key={review._id}>
                <div className="flex gap-4">
                  <Link to={`${PATH.product}/${reviewProduct?._id}`}>
                    <img
                      alt={reviewProduct?.name}
                      src={reviewProduct?.image}
                      className="w-14 h-14 object-cover border border-[#e1e1e1]"
                    />
                  </Link>
                  <div>
                    <span className="block">{formatDateVNFull(review.createdAt)}</span>
                    <p className="text-[15px]">{review.comment}</p>
                    <Rating rating={review.rating} />
                  </div>
                </div>
                <div className="flex mt-2 gap-x-2">
                  <Button onClick={() => openModalUpdate(review)}>Chỉnh sửa nhận xét</Button>
                  <Button onClick={() => handleDeleteReview(review._id)}>Xóa nhận xét</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Modal
        isOpen={isShowAdd}
        onRequestClose={toggleModalAdd}
        contentLabel="Thêm bình luận mới"
        className="stylesModal"
        style={{ overlay: { backgroundColor: "#2424247f", zIndex: "1000" } }}
      >
        <div className="flex gap-x-2">
          <img alt={productReview.name} src={productReview.image} className="w-10 h-10" />
          <h3 className="font-medium product-title">{productReview.name}</h3>
        </div>
        <div className="my-3">
          <h2 className="text-lg font-semibold text-center">Vui lòng đánh giá</h2>
          <SelectStar rating={rating} setRating={setRating} />
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé."
          />
        </div>
        <div className="flex gap-x-2">
          <Button
            className="w-full"
            onClick={() => {
              toggleModalAdd();
              setComment("");
            }}
          >
            Hủy
          </Button>
          <Button primary className="w-full" onClick={handleAddNewReview}>
            Gửi đánh giá
          </Button>
        </div>
      </Modal>
      {dataReview && (
        <Modal
          isOpen={isShowUpdate}
          onRequestClose={toggleModalUpdate}
          contentLabel="Chỉnh sửa nhận xét"
          className="stylesModal"
          style={{ overlay: { backgroundColor: "#2424247f", zIndex: "1000" } }}
        >
          <div className="flex gap-x-2">
            <Image alt={productReview.name} src={productReview.image} className="w-10 h-10" />
            <div>
              <h3 className="product-title line-clamp-1">{productReview.name}</h3>
              <span>Shopbee</span>
            </div>
          </div>
          <div className="my-3">
            <h2 className="text-lg font-semibold text-center">Vui lòng đánh giá</h2>
            <SelectStar rating={dataReview.rating} onSelectRating={handleSelectRating} />
            <Textarea
              value={dataReview.comment}
              onChange={(e) => setDataReview({ ...dataReview, comment: e.target.value })}
              placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé."
            />
          </div>
          <div className="flex gap-x-2">
            <Button className="w-full" onClick={toggleModalUpdate}>
              Hủy
            </Button>
            <Button primary className="w-full" onClick={() => handleUpdateReview(dataReview._id)}>
              Chỉnh sửa
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderReview;
