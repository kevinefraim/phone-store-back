import { Router } from "express";
import {
  createPhone,
  deletePhone,
  getPhoneById,
  getPhones,
  updatePhone,
} from "../controllers/phones.controller";
import { revToken, schemaValidator, validateAdmin } from "../middlewares";
import { phoneSchema } from "../schemas";

const router = Router();

router.get("/", getPhones);
router.get("/:id", getPhoneById);
router.post(
  "/create",
  revToken,
  validateAdmin,
  schemaValidator(phoneSchema),
  createPhone
);
router.put("/update/:id", revToken, validateAdmin, updatePhone);
router.delete("/delete/:id", revToken, validateAdmin, deletePhone);

export default router;
