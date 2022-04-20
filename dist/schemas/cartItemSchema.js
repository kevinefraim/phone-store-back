"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemSchema = void 0;
const zod_1 = require("zod");
exports.cartItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().optional(),
    phone: zod_1.z.number(),
    cart: zod_1.z.number(),
});
