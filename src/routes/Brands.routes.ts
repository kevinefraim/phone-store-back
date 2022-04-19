import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers/brands.controllers";
import { revToken, validateAdmin } from "../middlewares";

const router = Router();

router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/create", revToken, validateAdmin, createBrand);
router.put("/update/:id", revToken, validateAdmin, updateBrand);
router.delete("/delete/:id", revToken, validateAdmin, deleteBrand);

export default router;
