import { IOrderItem, IProduct } from "@types";
import { productAPI } from "apis";
import { Button } from "components/button";
import { ModalAddReview, ModalUpdateReview } from "components/modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import OrderProduct from "./OrderProduct";

interface OrderReviewProps {
  orderItems: IOrderItem[];
  fetchDetailsOrder: () => Promise<void>;
}

const OrderReview = ({ orderItems, fetchDetailsOrder }: OrderReviewProps) => {
  const { currentUser } = useStore((state) => state);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [productReview, setProductReview] = useState<IProduct>(Object);
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

  const handleDeleteReview = async (productId: string, reviewId: string) => {
    try {
      const payload = {
        reviewId,
      };
      const { success, message } = await productAPI.deleteReview(productId, payload);
      if (success) {
        toast.success(message);
        fetchDetailsOrder();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='p-4 mt-4 bg-white rounded-md'>
      {orderItems.map((orderItem) => {
        const { product } = orderItem;
        const { reviews } = product;
        const existReview = reviews?.find((review) => review.user._id === currentUser._id);
        return (
          <div className='my-3' key={product._id}>
            <OrderProduct order={orderItem} />
            {existReview?._id ? (
              <div className='flex gap-x-2'>
                <Button onClick={() => openModalUpdate(product)}>Chỉnh sửa nhận xét</Button>
                <Button onClick={() => handleDeleteReview(product._id, existReview._id)}>
                  Xóa nhận xét
                </Button>
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
        fetchDetailsOrder={fetchDetailsOrder}
      />
      <ModalUpdateReview
        isOpen={showModalUpdate}
        closeModal={closeModalUpdate}
        product={productReview}
      />
    </div>
  );
};

export default OrderReview;
