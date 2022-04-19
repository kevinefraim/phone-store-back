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

router.use(revToken);
router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/create", validateAdmin, createBrand);
router.put("/update/:id", validateAdmin, updateBrand);
router.delete("/delete/:id", validateAdmin, deleteBrand);

export default router;
