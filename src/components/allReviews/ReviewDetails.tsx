import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import Wrapper from "../common/Wrapper";
import Spinner from "../common/Spinner";
import { Star } from "lucide-react";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import { config } from "@/config";
import { Review } from "@/utils/reviewInterface";



const ReviewDetails = () => {
  const { user } = useContext(AuthContext) as any as AuthInfo;
  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    if (id) {
      const fetchReview = async () => {
        try {
          const response = await fetch(`${config.API_BASE_URL}/reviews/${id}`);
          const data = await response.json();
          setReview(data);
        } catch (err: any) {
          toast.error(err.message);
        }
      };

      fetchReview();
    }
  }, [id]);

  const handleWatchList = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/watchLists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...review, userEmail: user?.email }),
      });
      if (!response.ok) {
        toast.error("This game already exist watch list");
        return;
      }
      toast.success("Watch List add successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!review) return <Spinner />;

  return (
    <Wrapper>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='md:flex'>
          <div className='md:flex-shrink-0 md:w-1/3'>
            <img
              src={review.gameCoverUrl}
              alt={review.gameTitle}
              className='aspect-square h-full w-full rounded-lg'
            />
          </div>
          <div className='p-8 md:w-2/3'>
            <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
              {review.genre}
            </div>
            <h1 className='block mt-1 text-lg leading-tight font-medium text-black'>
              {review.gameTitle}
            </h1>
            <div className='flex gap-2 items-center'>
              Rating:
              <div>
                <div className='flex gap-1 items-center'>
                  <span>{review.rating}/10</span>
                  <Star className='text-yellow-400' size={16} />
                </div>
              </div>
            </div>
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
            <div className='mt-6'>
              <Button onClick={handleWatchList}>Add to WatchList</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 text-center'>
        <Link to='/reviews'>
          <Button variant={"destructive"}>Back to All Reviews</Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ReviewDetails;
