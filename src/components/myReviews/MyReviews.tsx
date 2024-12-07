import { Pencil, Trash2 } from "lucide-react";
import Wrapper from "../common/Wrapper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { config } from "@/config";
import Spinner from "../common/Spinner";

interface Review {
  _id: string;
  GameId: string;
  gameCoverUrl: string;
  gameTitle: string;
  genre: string;
  email: string;
}

const MyReviews = () => {
  const { user } = useContext(AuthContext) as any as AuthInfo;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = user?.email;

  useEffect(() => {
    const getReviewsByEmail = async () => {
      try{
        setLoading(true);
      const response = await fetch(
        `${config.API_BASE_URL}/reviewByEmail?email=${email}`
      );
      const data = await response.json();
      setReviews(data);
      }catch(err: any){
        toast.error(err.message);
      }finally{
        setLoading(false);
      }
    }
    getReviewsByEmail();
  }, [email]);

  // handle edit
  const handleEdit = (id: string) => {
    navigate(`/updateReview/${id}`);
  };

  // handle delete
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/reviews?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to delete the item");
      }
      toast.success("Review deleted successfully");
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <Wrapper>
      <Table>
        <TableCaption>A list of your recent watch List Games.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>No</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map(({ _id, gameCoverUrl, gameTitle, genre }, index) => (
            <TableRow key={_id}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>
                <img
                  src={gameCoverUrl}
                  alt='avatar'
                  className='w-10 aspect-square rounded-full'
                />
              </TableCell>
              <TableCell>
                <span className='text-xs md:text-sm'>{gameTitle}</span>
              </TableCell>
              <TableCell>{genre}</TableCell>
              <TableCell className='text-right flex justify-end divide-x-2 divide-emerald-400'>
                <span
                  onClick={() => handleEdit(_id)}
                  className='cursor-pointer text-primary pr-2'
                >
                  <Pencil />
                </span>

                <span
                  onClick={() => handleDelete(_id)}
                  className='cursor-pointer text-red-500 pl-2'
                >
                  <Trash2 />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};

export default MyReviews;
