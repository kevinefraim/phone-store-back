import { Router } from "express";
import {
  createCart,
  getCart,
  getCartById,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", getCart);
router.get("/:cartId", getCartById);
router.post("/create", createCart);

export default router;
