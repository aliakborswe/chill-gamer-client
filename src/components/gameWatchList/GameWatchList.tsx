import { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import {Trash2 } from "lucide-react";


interface Watch {
  _id: string;
  GameId: string;
  gameCoverUrl: string;
  gameTitle: string;
  genre: string;
  email: string;
}
const GameWatchList = () => {
  const { user } = useContext(AuthContext) as any as AuthInfo;
  const [watchList, setWatchList] = useState<Watch[]>([]);

  const email = user?.email;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/watchLists?email=${email}`);
        const data = await response.json();
        setWatchList(data);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    fetchReviews();
  }, [email]);

  const handleDelete = async (id: string) => {
    try {
      // Send DELETE request to the server
      const response = await fetch(
        `http://localhost:8080/api/v1/watchLists?id=${id}`,
        { method: "DELETE" }
    );
    

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to delete the item");
      }

      toast.success("Game deleted successfully");
      setWatchList((prevWatchList) =>
        prevWatchList.filter((item) => item._id !== id)
      );
    } catch (err: any) {
      toast.error(err.message);
    }
  };

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
          {watchList.map(({ gameId:{_id, gameCoverUrl, gameTitle, genre } = {}}, index) => (
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
              <TableCell className='text-right'>
                <span
                  onClick={() => handleDelete(_id)}
                  className='cursor-pointer text-red-500 flex justify-end'
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

export default GameWatchList;
