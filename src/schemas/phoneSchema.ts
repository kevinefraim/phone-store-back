import { z } from "zod";

export const phoneSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  image: z.string(),
  // brand: z.enum(), cant't make an enum of numbers
});
