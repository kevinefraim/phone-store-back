"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    password: zod_1.z.string(),
    isAdmin: zod_1.z.boolean().optional(),
});
