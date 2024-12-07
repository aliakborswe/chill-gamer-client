
import { useState, useEffect } from "react";
import ReviewCard from "../common/ReviewCard";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

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

const AllReviews=()=>{
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err:any) {
        toast.error(err.message);
      }finally{
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
if (loading) return <Spinner />;
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Game Reviews</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}



export default AllReviews;