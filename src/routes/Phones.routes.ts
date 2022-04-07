import { Router } from "express";
import {
  createPhones,
  deletePhones,
  getPhoneById,
  getPhones,
  updatePhones,
} from "../controllers/phones.controller";

const router = Router();

router.get("/", getPhones);
router.get("/:id", getPhoneById);
router.post("/create", createPhones);
router.put("/update/:id", updatePhones);
router.delete("/delete/:id", deletePhones);

export default router;
