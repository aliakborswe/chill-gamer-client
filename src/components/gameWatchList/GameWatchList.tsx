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
import { Trash2 } from "lucide-react";
import { config } from "@/config";
import Spinner from "../common/Spinner";

interface Watch {
  _id: string;
  gameId: any;
  gameCoverUrl: string;
  gameTitle: string;
  genre: string;
  email: string;
}
const GameWatchList = () => {
  const { user } = useContext(AuthContext) as any as AuthInfo;
  const [watchList, setWatchList] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(false)

  const email = user?.email;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/watchLists?email=${email}`
        );
        const data = await response.json();
        setWatchList(data);
      } catch (err: any) {
        toast.error(err.message);
      }finally {
        setLoading(false)
      }
    }

    fetchReviews();
  }, [email]);

  const handleDelete = async (id: string) => {
    try {
      // Send DELETE request to the server
      const response = await fetch(
        `${config.API_BASE_URL}/watchLists?id=${id}`,
        {
          method: "DELETE",
        }
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

  if(loading){
    return <Spinner/>
  }

  return (
    <Wrapper>
      <Table>
        <TableCaption>A list of your recent watch List Games.</TableCaption>
        <TableHeader>
          <TableRow className='border-b border-muted-foreground'>
            <TableHead className='w-[100px]'>No</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchList.map(({ gameId, _id }, index) => (
            <TableRow
              key={gameId?._id}
              className='border-b border-muted-foreground'
            >
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>
                <img
                  src={gameId?.gameCoverUrl}
                  alt='avatar'
                  className='w-10 aspect-square rounded-full'
                />
              </TableCell>
              <TableCell>
                <span className='text-xs md:text-sm'>{gameId?.gameTitle}</span>
              </TableCell>
              <TableCell>{gameId?.genre}</TableCell>
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
