import { Router } from "express";
import app from "../app";
import {
  createPhone,
  deletePhone,
  getPhoneById,
  getPhones,
  updatePhone,
} from "../controllers/phones.controller";
import { revToken } from "../middlewares/revToken";

const router = Router();

router.use(revToken);
router.get("/", getPhones);
router.get("/:id", getPhoneById);
router.post("/create", createPhone);
router.put("/update/:id", updatePhone);
router.delete("/delete/:id", deletePhone);

export default router;
