import { z } from "zod";

// Auth Register
export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Auth Login
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// User
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  role: z.enum(["user", "admin"]).optional(),
});

// Restaurant
export const restaurantSchema = z.object({
  name: z.string().min(3, "Name is required").max(100, "Max 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Max 1000 characters"),
  photoUrl: z.string().url("Photo URL must be valid"),
  location: z
    .string()
    .min(3, "Location is required")
    .max(100, "Max 100 characters"),
  mapsUrl: z.string().url("Maps URL must be valid"),
});

// Review
export const reviewSchema = z.object({
  title: z.string().min(3, "Title is required").max(100, "Max 100 characters"),
  text: z.string().min(1, "Text is required").max(1000, "Max 1000 characters"),
  rating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .min(1)
    .max(5),
});

// Comment
export const commentSchema = z.object({
  text: z.string().min(1, "Text is required").max(1000, "Max 1000 characters"),
});

// Types
export type RestaurantForm = z.infer<typeof restaurantSchema>;
export type UserForm = z.infer<typeof userSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ReviewForm = z.infer<typeof reviewSchema>;
export type CommentForm = z.infer<typeof commentSchema>;
