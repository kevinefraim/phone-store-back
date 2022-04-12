import { Router } from "express";
import {
  createItem,
  deleteItemById,
  getItemById,
  getItems,
  updateItemById,
} from "../controllers/cartItem.controller";

const router = Router();

router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/create", createItem);
router.put("/update/:id", updateItemById);
router.delete("/delete/:id", deleteItemById);

export default router;
