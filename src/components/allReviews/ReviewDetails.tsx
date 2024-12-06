import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import Wrapper from "../common/Wrapper";

interface Review {
  _id: string;
  gameCoverUrl: string;
  gameTitle: string;
  reviewDescription: string;
  rating: number;
  publishingYear: number;
  genre: string;
  userEmail: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

const ReviewDetails =()=> {

  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    if (id) {
      const fetchReview = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/reviews/${id}`
          );
          const data = await response.json();
          setReview(data);
        } catch (err:any) {
          toast.error(err.message)
        } 
      };

      fetchReview();
    }
  }, [id]);


  if (!review) return <div className='text-center py-10'>Review not found</div>;

  return (
    <Wrapper>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='md:flex'>
          <div className='md:flex-shrink-0'>
            <img
              src={review.gameCoverUrl}
              alt={review.gameTitle}
              className='aspect-square h-full w-full rounded-lg'
            />
          </div>
          <div className='p-8'>
            <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
              {review.genre}
            </div>
            <h1 className='block mt-1 text-lg leading-tight font-medium text-black'>
              {review.gameTitle}
            </h1>
            <p className='mt-2 text-gray-500'>
              Published in {review.publishingYear}
            </p>
            <p className='mt-4 text-gray-500'>{review.reviewDescription}</p>
            <div className='mt-6'>
              <p className='text-sm text-gray-600'>
                Reviewed by: {review.userName} ({review.userEmail})
              </p>
              <p className='text-sm text-gray-600'>
                Created: {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p className='text-sm text-gray-600'>
                Last updated: {new Date(review.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 text-center'>
        <Link to='/reviews'>
          <Button>Back to All Reviews</Button>
        </Link>
      </div>
    </Wrapper>
  );
}

export default ReviewDetails;
