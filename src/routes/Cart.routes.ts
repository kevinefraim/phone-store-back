import { Router } from "express";
import { getCartById } from "../controllers/cart.controller";
import { revToken } from "../middlewares";

const router = Router();

router.get("/", revToken, getCartById);

export default router;
