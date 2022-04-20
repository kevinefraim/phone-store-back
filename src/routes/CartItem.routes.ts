import { Router } from "express";
import {
  createItem,
  deleteItemById,
  getItemById,
  getItems,
  updateItemById,
} from "../controllers/cartItem.controller";
import { revToken, schemaValidator } from "../middlewares";
import { cartItemSchema } from "../schemas/cartItemSchema";

const router = Router();

router.use(revToken);
router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/create", schemaValidator(cartItemSchema), createItem);
router.put("/update/:id", schemaValidator(cartItemSchema), updateItemById);
router.delete("/delete/:id", deleteItemById);

export default router;
