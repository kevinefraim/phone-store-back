import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  last_name: z.string().optional(),
  password: z.string().optional(),
  isAdmin: z.boolean().optional(),
});
