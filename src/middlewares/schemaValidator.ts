import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ ok: false, msg: error.flatten().fieldErrors });
      }
    }
    next();
  };
