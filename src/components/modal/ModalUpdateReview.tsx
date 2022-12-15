import { IProduct, IReview } from "@types";
import { reviewAPI } from "apis";
import { Button } from "components/button";
import { ReviewSelectStar } from "components/review";
import { Textarea } from "components/textarea";
import { ProductImage, ProductTitle } from "modules/_product";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalUpdateReviewProps {
  isOpen: boolean;
  closeModal: () => void;
  productReview: IProduct;
  dataReview: IReview;
  fetchReviews: () => Promise<void>;
}

const ModalUpdateReview = ({
  isOpen,
  closeModal,
  productReview,
  dataReview,
  fetchReviews
}: ModalUpdateReviewProps) => {
  const { id = "" } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleUpdateReview = async () => {
    try {
      if (comment === "") {
        toast.error("Vui lòng thêm nhận xét");
        return;
      }
      if (rating === 0) {
        toast.error("Vui lòng chọn điểm đánh giá");
        return;
      }
      const payload = { rating, comment, productId: productReview._id, orderId: id };
      const { message } = await reviewAPI.updateReview(dataReview._id, payload);
      toast.success(message);
      fetchReviews();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    setRating(dataReview.rating);
    setComment(dataReview?.comment);
  }, [dataReview]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Chỉnh sửa nhận xét"
      className="max-w-[600px] w-full min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md"
      style={{ overlay: { backgroundColor: "#2424247f", zIndex: "1000" } }}
    >
      <div className="flex gap-x-2">
        <ProductImage src={productReview.image} className="w-10 h-10" />
        <div>
          <ProductTitle className="font-medium line-clamp-1">{productReview.name}</ProductTitle>
          <span>Shopbee</span>
        </div>
      </div>
      <div className="my-3">
        <h2 className="text-lg font-semibold text-center">Vui lòng đánh giá</h2>
        <ReviewSelectStar rating={rating} setRating={setRating} />
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé."
        />
      </div>
      <div className="flex gap-x-2">
        <Button className="w-full" onClick={closeModal}>
          Hủy
        </Button>
        <Button primary className="w-full" onClick={handleUpdateReview}>
          Chỉnh sửa
        </Button>
      </div>
    </Modal>
  );
};

export default ModalUpdateReview;
