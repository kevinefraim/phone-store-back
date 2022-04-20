"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const zod_1 = require("zod");
const schemaValidator = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.json({ error: error.flatten().fieldErrors });
        }
        else {
            res.json({ ok: false, msg: error });
        }
    }
    next();
};
exports.schemaValidator = schemaValidator;
