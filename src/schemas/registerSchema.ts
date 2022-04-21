import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  last_name: z.string(),
  password: z.string(),
  isAdmin: z.boolean(),
});
