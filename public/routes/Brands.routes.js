"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brands_controllers_1 = require("../controllers/brands.controllers");
const revToken_1 = require("../middlewares/revToken");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const router = (0, express_1.Router)();
router.use(revToken_1.revToken);
router.get("/", brands_controllers_1.getBrands);
router.get("/:id", brands_controllers_1.getBrandById);
router.post("/create", validateAdmin_1.validateAdmin, brands_controllers_1.createBrand);
router.put("/update/:id", validateAdmin_1.validateAdmin, brands_controllers_1.updateBrand);
router.delete("/delete/:id", validateAdmin_1.validateAdmin, brands_controllers_1.deleteBrand);
exports.default = router;
