import { z } from "zod";


export const registerValidator = z.object({

  name:z
    .string()
    .min(2,"Name must contain at least 2 characters"),


  username:z
    .string()
    .min(3,"Username must contain at least 3 characters")
    .max(20,"Username too long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscore"
    ),


  email:z
    .string()
    .email("Invalid email address"),


  password:z
    .string()
    .min(8,"Password must contain at least 8 characters")

});


export const loginValidator = z.object({

  username:z
    .string()
    .min(3,"Username is required"),


  password:z
    .string()
    .min(8,"Password is required")

});