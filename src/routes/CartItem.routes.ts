import { Router } from "express";
import {
  createItem,
  deleteItemById,
  getItemById,
  getItems,
  getItemsByCart,
  updateItemById,
} from "../controllers/cartItem.controller";
import { revToken, schemaValidator } from "../middlewares";
import { cartItemSchema, updateItemSchema } from "../schemas";

const router = Router();

router.use(revToken);
router.get("/", getItems);
router.get("/:id", getItemById);
router.get("/cart/:cartId", getItemsByCart);
router.post("/create", schemaValidator(cartItemSchema), createItem);
router.put("/update/:id", schemaValidator(updateItemSchema), updateItemById);
router.delete("/delete/:id", deleteItemById);

export default router;
