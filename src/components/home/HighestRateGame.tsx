import { Review } from "@/utils/reviewInterface";
import Wrapper from "../common/Wrapper";
import { useEffect, useState } from "react";
import { config } from "@/config";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import ReviewCard from "../common/ReviewCard";


const HighestRateGame = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchReviews = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${config.API_BASE_URL}/reviews`);
          const data = await response.json();
          setReviews(data);
        } catch (err: any) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }, []);
    if (loading) return <Spinner />;

    const highestRatingReview = reviews
      .filter((review) => review.rating >= 6)
      .slice(0, 6);
    return (
      <Wrapper>
        <h1 className='text-3xl font-bold mb-8 text-center'>Highest Rate Games</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {highestRatingReview.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </Wrapper>
    );
};

export default HighestRateGame;