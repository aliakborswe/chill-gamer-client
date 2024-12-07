import { useState, useEffect } from "react";
import ReviewCard from "../common/ReviewCard";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import { config } from "@/config";
import Wrapper from "../common/Wrapper";
import { Review } from "@/utils/reviewInterface";


const AllReviews = () => {
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
  return (
    <Wrapper>
      <h1 className='text-3xl font-bold mb-8 text-center'>Game Reviews</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </Wrapper>
  );
};

export default AllReviews;
