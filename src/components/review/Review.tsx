import { useEffect, useState } from "react";
import { IReview } from "@types";
import { PaginationV2 } from "components/pagination";
import { reviewAPI } from "apis";
import ReviewItem from "./ReviewItem";
import ReviewEmpty from "./ReviewEmpty";

interface ReviewProps {
  productId: string;
}

const reviewsPerPage = 5;
const Review = ({ productId }: ReviewProps) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * reviewsPerPage;
  const indexOfFirstPost = indexOfLastPost - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstPost, indexOfLastPost);
  const handleChangePage = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchReviewProduct = async () => {
      try {
        const { data } = await reviewAPI.getAllReviewProduct(productId);
        setReviews(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviewProduct();
  }, [productId]);

  return (
    <div>
      {currentReviews.length === 0 ? (
        <ReviewEmpty />
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
          totalItems={reviews.length}
        />
      )}
    </div>
  );
};

export default Review;
