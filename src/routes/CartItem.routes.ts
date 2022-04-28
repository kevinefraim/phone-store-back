import { Router } from "express";
import {
  createItem,
  deleteAllItems,
  deleteItemById,
  getItemById,
  getItems,
  updateItemById,
} from "../controllers/cartItem.controller";
import { revToken, schemaValidator } from "../middlewares";
import { cartItemSchema, updateItemSchema } from "../schemas";

const router = Router();

router.use(revToken);
router.get("/", getItems);
router.get("/item/:id", getItemById);
router.post("/create", schemaValidator(cartItemSchema), createItem);
router.put("/update/:id", schemaValidator(updateItemSchema), updateItemById);
router.delete("/delete/one/:id", deleteItemById);
router.delete("/delete/all", deleteAllItems);

export default router;
