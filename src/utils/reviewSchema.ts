import * as z from "zod"

export const reviewSchema = z.object({
  gameCoverUrl: z.string().url("Invalid URL format."),
  gameTitle: z.string().min(1, "Game title is required."),
  reviewDescription: z.string().min(10, "Review description must be at least 10 characters long."),
  rating: z.number().min(1, "Rating must be at least 1.").max(10, "Rating cannot exceed 10."),
  publishingYear: z.number().min(1900, "Publishing year must be later than 1900.").max(new Date().getFullYear(), "Publishing year cannot be in the future."),
  genre: z.enum(["Action", "RPG", "Adventure", "Puzzle", "Shooter", "Strategy"]),
  userEmail: z.string().email("Invalid email format."),
  userName: z.string().min(1, "User name is required."),
})

export type ReviewFormValues = z.infer<typeof reviewSchema>