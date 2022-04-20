"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSchema = void 0;
const zod_1 = require("zod");
exports.phoneSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    stock: zod_1.z.number(),
    image: zod_1.z.string(),
    brand: zod_1.z.number(),
});
