import Modal from "react-modal";
import { Button } from "components/button";
import { IconClose } from "components/icons";
import { ProductImage, ProductTitle } from "modules/product";

interface ModalAddReviewProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalAddReview = ({ isOpen, closeModal }: ModalAddReviewProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='Add new review'
      className='max-w-[600px] min-w-[300px] bg-white top-1/2 absolute left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 rounded-md'
      style={{
        overlay: {
          backgroundColor: "#2424247f",
          zIndex: "100",
        },
      }}
    >
      <div>
        <div className='flex gap-x-2'>
          <ProductImage
            imageUrl='https://salt.tikicdn.com/cache/200x200/ts/product/83/11/1b/a5e3e184831377b9ad63d714e9f38ec8.jpg'
            className='w-10 h-10'
          />
          <div>
            <ProductTitle className='font-medium line-clamp-1'>
              Áo thun nam trơn cổ tròn thời trang Everest nhiều màu - Xanh Thiên Thanh - XL
            </ProductTitle>
            <span>Shopbee</span>
          </div>
          <button type='button' onClick={closeModal}>
            <IconClose />
          </button>
        </div>
        <div>
          <h2 className='mt-4 text-lg font-semibold text-center'>Vui lòng đánh giá</h2>
          <textarea
            rows={5}
            placeholder='Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé.'
            className='border-[#00000024] focus:border-[#0000008a] border mt-6 p-3 w-full outline-none resize-none rounded'
          />
        </div>
        <div className='flex mt-4 gap-x-2'>
          <Button className='w-full'>Thêm ảnh</Button>
          <Button primary className='w-full'>
            Gửi đánh giá
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddReview;
