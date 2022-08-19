import { IProduct } from "@types";
import { productAPI } from "apis";
import { Button } from "components/button";
import { ProductImage, ProductTitle } from "modules/product";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

interface ModalUpdateReviewProps {
  isOpen: boolean;
  product: IProduct;
  closeModal: () => void;
}

const ModalUpdateReview = ({ isOpen, closeModal, product }: ModalUpdateReviewProps) => {
  const { currentUser } = useStore((state) => state);
  const [rating] = useState(4);
  const [comment, setComment] = useState("");
  const myReview = product.reviews?.find((review) => review.user._id === currentUser._id);

  const handleUpdateReview = async () => {
    try {
      const { success, message } = await productAPI.updateReview(product._id, {
        reviewId: myReview?._id,
        rating,
        comment,
      });
      if (success) {
        toast.success(message);
        closeModal();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (myReview?.comment) setComment(myReview?.comment);
  }, [myReview]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='Chỉnh sửa nhận xét'
      className='max-w-[600px] w-full min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md'
      style={{
        overlay: {
          backgroundColor: "#2424247f",
          zIndex: "100",
        },
      }}
    >
      <div>
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
            }}
          >
            Hủy
          </Button>
          <Button primary className='w-full' onClick={handleUpdateReview}>
            Chỉnh sửa nhận xét
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdateReview;
