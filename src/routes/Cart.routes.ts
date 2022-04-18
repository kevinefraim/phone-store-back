import { Router } from "express";
import { getCart } from "../controllers/cart.controller";

const router = Router();

router.get("/", getCart);

export default router;
