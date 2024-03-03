import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  name: string({
    required_error: "Name is required",
  }).min(1, "Name is required"),
  email: string({
    required_error: "Email is required",
  })
    .email("Invalid email")
    .min(1, "Email is required"),
  photo: string().optional(),
  password: string({
    required_error: "Password is required",
  })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be less then 32 characters long"),
  passwordConfirm: string({
    required_error: "please confirm your password",
  }).min(1, "please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export const loginUserSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export type CreateUserInput = TypeOf<typeof createUserSchema>;
