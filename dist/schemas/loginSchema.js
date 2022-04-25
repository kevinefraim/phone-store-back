"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Ingrese un email válido" }),
    password: zod_1.z
        .string()
        .min(8, { message: "La contraseña debe tener 8 caracteres como mínimo" }),
});
