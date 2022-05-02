import { z } from "zod";

export const phoneSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  stock: z.string(),
  brand: z.string(),
});
