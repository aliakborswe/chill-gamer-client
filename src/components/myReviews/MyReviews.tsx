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
  console.log(reviews)

  const email = user?.email;

  useEffect(() =>{
    const getReviewsByEmail = async ()=>{
      const response = await fetch(
        `http://localhost:8080/api/v1/reviews?email=${email}`
      );
      const data = await response.json()
      setReviews(data);
    }
    getReviewsByEmail();
  },[email])
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
                <span className='cursor-pointer text-primary pr-2'>
                  <Pencil />
                </span>
                <span className='cursor-pointer text-red-500 pl-2'>
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
