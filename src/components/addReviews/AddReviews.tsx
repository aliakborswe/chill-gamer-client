import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import { ReviewFormValues, reviewSchema } from "@/utils/reviewSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { config } from "@/config";

const AddReviews = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext) as AuthInfo;

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      gameCoverUrl: "",
      gameTitle: "",
      reviewDescription: "",
      rating: 5,
      publishingYear: new Date().getFullYear(),
      genre: "RPG",
      userEmail: user?.email || "",
      userName: user?.displayName || "",
    },
  });

  async function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Failed to submit review");
      }

      toast.success("Review submitted successfully");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-2xl mx-auto p-4'
      >
        <FormField
          control={form.control}
          name='gameCoverUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Cover URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='https://example.com/game-cover.jpg'
                  {...field}
                  className='border-black'
                />
              </FormControl>
              <FormDescription>
                Enter the URL of the game cover image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gameTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Title</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter game title'
                  {...field}
                  className='border-black'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='reviewDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Write your review here (minimum 10 characters)'
                  {...field}
                  className='border-black'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={1}
                  max={10}
                  placeholder='Rate from 1 to 10'
                  {...field}
                  className='border-black'
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Rate the game from 1 to 10.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='publishingYear'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publishing Year</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={1900}
                  max={new Date().getFullYear()}
                  placeholder='Enter publishing year'
                  {...field}
                  className='border-black'
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='genre'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='border-black'>
                    <SelectValue placeholder='Select a genre' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Action",
                    "RPG",
                    "Adventure",
                    "Puzzle",
                    "Shooter",
                    "Strategy",
                  ].map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='userEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input {...field} className='border-black' disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input {...field} className='border-black' disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
};

export default AddReviews;
