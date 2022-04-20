import { string, z } from "zod";

export const brandSchema = z.object({
  name: z.string(),
});
