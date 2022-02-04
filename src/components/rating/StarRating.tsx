import { StarIcon } from '@heroicons/react/solid';

export default function StarRating(props: { rating: number, reviews_count?: number }) {
  const { rating, reviews_count } = props;

  return (
    <>
      <div className="flex items-center">
        <p className="sr-only">{rating} out of 5 stars</p>
        <span className="font-normal text-gray-500">
          {rating}
        </span>

        {[0, 1, 2, 3, 4].map(rating_option => (
          <StarIcon
            key={rating_option}
            className={`${
              rating > rating_option
                ? 'text-yellow-400'
                : 'text-gray-200'
            }
          flex-shrink-0 h-4 w-4`}
            aria-hidden="true"
          />
        ))}
        {reviews_count &&
          <p className="font-normal text-gray-500">
            ({reviews_count})
          </p>
        }
      </div>
    </>
  );
}
