import { z } from "zod";

export const messagesSchema = z.object({
  fullName: z.string().nonempty({ message: "Campo vacío" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Ingrese un número válido" })
    .nonempty({ message: "Campo vacío" }),
  message: z.string().nonempty("Mensaje vacío"),
});
