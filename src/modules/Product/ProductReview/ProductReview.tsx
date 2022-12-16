import { reviewAPI } from "apis";
import PaginationV2 from "components/PaginationV2";
import { useState } from "react";
import { useQuery } from "react-query";
import ReviewItem from "./ReviewItem";

interface ProductReviewProps {
  productId: string;
}

const reviewsPerPage = 5;
const ProductReview = ({ productId }: ProductReviewProps) => {
  const { data: reviewsData } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewAPI.getAllReviewProduct(productId),
    staleTime: 5 * 60 * 1000
  });
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * reviewsPerPage;
  const indexOfFirstPost = indexOfLastPost - reviewsPerPage;
  const currentReviews = reviewsData?.data.slice(indexOfFirstPost, indexOfLastPost) || [];
  const handleChangePage = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="mt-4 section-white">
      <div className="section-gray">ĐÁNH GIÁ SẢN PHẨM</div>
      <div>
        {currentReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 bg-white h-[180px]">
            <img src="/review-empty.png" alt="review-empty" />
            <h3>Chưa có đánh giá</h3>
          </div>
        ) : (
          currentReviews.map((review) => (
            <ReviewItem
              key={review._id}
              avatar={review.user.avatar}
              fullname={review.user.fullname}
              rating={review.rating}
              createdAt={review.createdAt}
            >
              {review.comment}
            </ReviewItem>
          ))
        )}
        {currentReviews.length > 0 && (
          <PaginationV2
            className="mt-6 mb-2"
            currentPage={currentPage}
            itemsPerPage={reviewsPerPage}
            handleChangePage={handleChangePage}
            totalItems={reviewsData?.data.length as number}
          />
        )}
      </div>
    </div>
  );
};

export default ProductReview;
