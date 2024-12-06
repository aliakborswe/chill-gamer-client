import { Link } from "react-router";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

interface ReviewCardProps {
  review: {
    _id: string;
    gameCoverUrl: string;
    gameTitle: string;
    genre: string;
    publishingYear: number;
    rating: number;
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className='w-full h-full flex flex-col'>
      <CardContent className='p-4 flex-grow'>
        <div className='aspect-w-16 aspect-h-9 mb-4'>
          <img
            src={review.gameCoverUrl}
            alt={review.gameTitle}
            className='rounded-md'
          />
        </div>
        <h3 className='text-lg font-semibold mb-2'>{review.gameTitle}</h3>
        <div className='space-y-2 text-sm'>
          <div className='text-sm flex gap-2'>
            Genres:
            <span className='text-sm font-semibold'>{review.genre}</span>
          </div>
          <div className='text-sm flex gap-2'>
            Publishing year:
            <span className='text-sm font-semibold'>
              {review.publishingYear}
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            Rating:
            <div>
              <div className='flex gap-1 items-center'>
                <span>{review.rating}/10</span>
                <Star className='text-yellow-400' size={16} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/reviews/${review._id}`} className='w-full'>
          <Button className='w-full'>Explore Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
