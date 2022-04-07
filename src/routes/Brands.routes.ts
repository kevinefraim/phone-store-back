import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers/brands.controllers";
import { revToken } from "../middlewares/revToken";

const router = Router();

router.use(revToken);
router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/create", createBrand);
router.put("/update/:id", updateBrand);
router.delete("/delete/:id", deleteBrand);

export default router;
