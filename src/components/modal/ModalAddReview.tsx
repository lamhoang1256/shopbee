import { IProduct } from "@types";
import { reviewAPI } from "apis";
import { Button } from "components/button";
import { ProductImage, ProductTitle } from "modules/product";
import { useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalAddReviewProps {
  isOpen: boolean;
  product: IProduct;
  closeModal: () => void;
  fetchReviews: () => Promise<void>;
}

const ModalAddReview = ({ isOpen, closeModal, product, fetchReviews }: ModalAddReviewProps) => {
  const { id = "" } = useParams();
  const [rating] = useState(4);
  const [comment, setComment] = useState("");
  const handleAddNewReview = async () => {
    try {
      const payload = { rating, comment, productId: product._id, orderId: id };
      const { message } = await reviewAPI.addNewReview(payload);
      toast.success(message);
      fetchReviews();
      closeModal();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='Thêm bình luận mới'
      className='max-w-[600px] w-full min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md'
      style={{
        overlay: {
          backgroundColor: "#2424247f",
          zIndex: "100",
        },
      }}
    >
      <div className='flex gap-x-2'>
        <ProductImage imageUrl={product.image} className='w-10 h-10' />
        <div>
          <ProductTitle className='font-medium line-clamp-1'>{product.name}</ProductTitle>
          <span>Shopbee</span>
        </div>
      </div>
      <div>
        <h2 className='mt-4 text-lg font-semibold text-center'>Vui lòng đánh giá</h2>
        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé.'
          className='border-[#00000024] focus:border-[#0000008a] border mt-6 p-3 w-full outline-none resize-none rounded'
        />
      </div>
      <div className='flex mt-4 gap-x-2'>
        <Button
          className='w-full'
          onClick={() => {
            closeModal();
            setComment("");
          }}
        >
          Hủy
        </Button>
        <Button primary className='w-full' onClick={handleAddNewReview}>
          Gửi đánh giá
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAddReview;
