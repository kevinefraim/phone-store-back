import { z } from "zod";

export const cartItemSchema = z.object({
  quantity: z.number().optional(),
  phone: z.number(),
  cart: z.number().optional(),
});
