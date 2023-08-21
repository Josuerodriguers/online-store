import { ReviewType } from '../../type';

type ListReviewsProps = {
  reviews: ReviewType[];
};

export default function ListReviews({ reviews }: ListReviewsProps) {
  return (
    <section>
      {reviews && reviews.map((review, index) => (
        <section key={ index }>
          <h4 data-testid="review-card-email">{review.email}</h4>
          <p data-testid="review-card-rating">{review.rating}</p>
          <p data-testid="review-card-evaluation">{review.message}</p>
        </section>
      ))}
    </section>
  );
}
