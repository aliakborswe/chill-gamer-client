import { useState, useEffect } from "react";
import ReviewCard from "../common/ReviewCard";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import { config } from "@/config";
import Wrapper from "../common/Wrapper";
import { Review } from "@/utils/reviewInterface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AllReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterReviews, setFilterReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState<
    "rating" | "year" | "default" | ""
  >("");
  const [filterOtn, setFilterOtn] = useState<
    "Action" | "RPG" | "Adventure" | "Puzzle" | "Shooter" | "Strategy" | ""
  >("");


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
  // for filtering
  useEffect(() => {
    const filteredReviews: Review[] = [...reviews].filter((review) =>
      review.genre.includes(filterOtn)
    );
    if (filteredReviews.length === 0 && filterOtn) {
      toast.info("No reviews found for the selected genre.");
    }
    setFilterReviews(filteredReviews);
  }, [reviews, filterOtn]);
  // for sorting
  useEffect(() => {
    const sortedReviews: Review[] = [...reviews].sort((a, b) => {
      if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      if (sortOption === "year") {
        return b.publishingYear - a.publishingYear;
      }
      return 0;
    });

    setFilterReviews(sortedReviews);
  }, [reviews, sortOption]);

  if (loading) return <Spinner />;
  return (
    <Wrapper>
      <div className='flex flex-col md:flex-row items-center md:justify-between mb-6'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Game Reviews</h1>
        <div className='flex gap-2'>
          {/* for filtering by game Genres  */}
          <Select
            value={filterOtn}
            onValueChange={(value) =>
              setFilterOtn(
                value as
                  | "Action"
                  | "RPG"
                  | "Adventure"
                  | "Puzzle"
                  | "Shooter"
                  | "Strategy"
              )
            }
          >
            <SelectTrigger className='w-40 border border-secondary'>
              <SelectValue placeholder='Filter by (Genres)' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Action'>Action</SelectItem>
              <SelectItem value='RPG'>RPG</SelectItem>
              <SelectItem value='Adventure'>Adventure</SelectItem>
              <SelectItem value='Puzzle'>Puzzle</SelectItem>
              <SelectItem value='Shooter'>Shooter</SelectItem>
              <SelectItem value='Strategy'>Strategy</SelectItem>
            </SelectContent>
          </Select>
          {/* for sorting by rating and year */}
          <Select
            value={sortOption}
            onValueChange={(value) =>
              setSortOption(value as "rating" | "year" | "default")
            }
          >
            <SelectTrigger className='w-32 md:w-36 border border-secondary'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='default'>Default</SelectItem>
              <SelectItem value='rating'>Rating (High to Low)</SelectItem>
              <SelectItem value='year'>Year (Newest First)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filterReviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </Wrapper>
  );
};

export default AllReviews;
