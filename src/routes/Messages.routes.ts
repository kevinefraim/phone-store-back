import { Router } from "express";
import { createMsg } from "../controllers/messages.controllers";
import { schemaValidator } from "../middlewares";
import { messagesSchema } from "../schemas";

const router = Router();

router.post("/create", schemaValidator(messagesSchema), createMsg);

export default router;
