import { IProduct, IReview } from "@types";
import { reviewAPI } from "apis";
import Button from "components/Button";
import Image from "components/Image";
import Textarea from "components/Textarea";
import SelectStar from "modules/Common/SelectStar";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalUpdateReviewProps {
  isOpen: boolean;
  closeModal: () => void;
  productReview: IProduct;
  dataReview: IReview;
  refetch: () => void;
}

const ModalUpdateReview = ({
  isOpen,
  closeModal,
  productReview,
  dataReview,
  refetch
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
      refetch();
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
        <SelectStar rating={rating} setRating={setRating} />
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
