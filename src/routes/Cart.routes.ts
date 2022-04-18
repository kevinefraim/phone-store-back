import { Router } from "express";
import { createCart, getCart } from "../controllers/cart.controller";

const router = Router();

router.get("/", getCart);
router.post("/create", createCart);

export default router;
