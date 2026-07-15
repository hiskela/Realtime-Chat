import { z } from "zod";


export const registerSchema = z.object({

  name: z
    .string()
    .min(2)
    .max(50),


  username: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscore"
    ),


  email: z
    .string()
    .email(),


  password: z
    .string()
    .min(8),

});


export const loginSchema = z.object({

  username: z
    .string()
    .min(3),


  password: z
    .string()
    .min(8),

});