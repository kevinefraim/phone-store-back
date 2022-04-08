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
import { validateAdmin } from "../middlewares/validateAdmin";

const router = Router();

router.use(revToken);
router.get("/", getPhones);
router.get("/:id", getPhoneById);
router.post("/create", validateAdmin, createPhone);
router.put("/update/:id", validateAdmin, updatePhone);
router.delete("/delete/:id", validateAdmin, deletePhone);

export default router;
