import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener 8 caracteres como mínimo" }),
});
