import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers/brands.controllers";

const router = Router();

router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/create", createBrand);
router.put("/update/:id", updateBrand);
router.delete("/delete/:id", deleteBrand);

export default router;
