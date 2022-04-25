import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }),
  name: z.string().nonempty({ message: "Campo vacío" }),
  last_name: z.string().nonempty({ message: "Campo vacío" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener 8 caracteres como mínimo" }),
  isAdmin: z.boolean().optional(),
});
