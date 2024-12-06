

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ReviewTable } from "@/components/ReviewTable";
import { UpdateReviewModal } from "@/components/UpdateReviewModal";
import { useToast } from "@/components/ui/use-toast";

interface Review {
  _id: string;
  gameTitle: string;
  rating: number;
  genre: string;
  publishingYear: number;
  // Add other fields as needed
}

const MyReviews=()=>{
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery<Review[]>("myReviews", fetchMyReviews);

  const deleteMutation = useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("myReviews");
      toast({
        title: "Review deleted",
        description: "Your review has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete the review. Please try again.",
        variant: "destructive",
      });
    },
  });

  async function fetchMyReviews() {
    const response = await fetch(
      "http://localhost:8080/api/v1/reviews/my-reviews",
      {
        credentials: "include", // This is important for including cookies in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return response.json();
  }

  async function deleteReview(id: string) {
    const response = await fetch(`http://localhost:8080/api/v1/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
    return response.json();
  }

  function handleUpdateClick(review: Review) {
    setSelectedReview(review);
    setIsUpdateModalOpen(true);
  }

  function handleDeleteClick(id: string) {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteMutation.mutate(id);
    }
  }

  if (isLoading) return <div className='text-center py-10'>Loading...</div>;
  if (error)
    return (
      <div className='text-center py-10 text-red-500'>
        Error fetching reviews
      </div>
    );

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>My Reviews</h1>
      <ReviewTable
        reviews={reviews || []}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />
      {selectedReview && (
        <UpdateReviewModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          review={selectedReview}
        />
      )}
    </div>
  );
}

export default MyReviews;
