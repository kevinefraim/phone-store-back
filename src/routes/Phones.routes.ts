import { Router } from "express";
import {
  createPhone,
  deletePhone,
  getPhoneById,
  getPhones,
  updatePhone,
} from "../controllers/phones.controller";

const router = Router();

router.get("/", getPhones);
router.get("/:id", getPhoneById);
router.post("/create", createPhone);
router.put("/update/:id", updatePhone);
router.delete("/delete/:id", deletePhone);

export default router;
