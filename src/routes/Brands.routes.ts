import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers/brands.controllers";
import { revToken, schemaValidator, validateAdmin } from "../middlewares";
import { brandSchema } from "../schemas";

const router = Router();

router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post(
  "/create",
  revToken,
  validateAdmin,
  schemaValidator(brandSchema),
  createBrand
);
router.put(
  "/update/:id",
  revToken,
  validateAdmin,
  schemaValidator(brandSchema),
  updateBrand
);
router.delete("/delete/:id", revToken, validateAdmin, deleteBrand);

export default router;
