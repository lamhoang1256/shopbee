import { useState } from "react";
import { IReview } from "@types";
import { PaginationV2 } from "components/pagination";
import ReviewItem from "./ReviewItem";
import ReviewEmpty from "./ReviewEmpty";

interface ReviewProps {
  reviews: IReview[];
}

const Review = ({ reviews }: ReviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const indexOfLastPost = currentPage * reviewsPerPage;
  const indexOfFirstPost = indexOfLastPost - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstPost, indexOfLastPost);
  const handleChangePage = (pageNumber: number) => setCurrentPage(pageNumber);
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
          className='mt-6 mb-2'
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
