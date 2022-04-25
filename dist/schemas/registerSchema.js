"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Ingrese un email válido" }),
    name: zod_1.z.string().nonempty({ message: "Campo vacío" }),
    last_name: zod_1.z.string().nonempty({ message: "Campo vacío" }),
    password: zod_1.z
        .string()
        .min(8, { message: "La contraseña debe tener 8 caracteres como mínimo" }),
    isAdmin: zod_1.z.boolean().optional(),
});
