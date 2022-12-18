import { IProduct } from "@types";
import { reviewAPI } from "apis";
import Button from "components/Button";
import SelectStar from "modules/Common/SelectStar";
import Textarea from "components/Textarea";
import { useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalAddReviewProps {
  isOpen: boolean;
  productReview: IProduct;
  closeModal: () => void;
  fetchReviews: () => Promise<void>;
}

const ModalAddReview = ({
  isOpen,
  closeModal,
  productReview,
  fetchReviews
}: ModalAddReviewProps) => {
  const { id = "" } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleAddNewReview = async () => {
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
      const { message } = await reviewAPI.addNewReview(payload);
      toast.success(message);
      fetchReviews();
      setRating(0);
      setComment("");
      closeModal();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Thêm bình luận mới"
      className="stylesModal"
      style={{ overlay: { backgroundColor: "#2424247f", zIndex: "1000" } }}
    >
      <div className="flex gap-x-2">
        <img alt={productReview.name} src={productReview.image} className="w-10 h-10" />
        <div>
          <h3 className="font-medium product-title line-clamp-1">{productReview.name}</h3>
          <span>Shopbee</span>
        </div>
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
            closeModal();
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
  );
};

export default ModalAddReview;
