"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().optional(),
    birth_date: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    isAdmin: zod_1.z.boolean().optional(),
});
