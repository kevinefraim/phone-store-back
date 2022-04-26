import { z } from "zod";

export const updateItemSchema = z.object({
  quantity: z.number().min(1, { message: "No se puede bajar la cantidad" }),
});
