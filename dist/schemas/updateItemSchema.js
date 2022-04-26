"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemSchema = void 0;
const zod_1 = require("zod");
exports.updateItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(1, { message: "No se puede bajar la cantidad" }),
});
