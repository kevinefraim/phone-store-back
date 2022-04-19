"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const router = (0, express_1.Router)();
router.get("/", cart_controller_1.getCart);
router.post("/create", cart_controller_1.createCart);
exports.default = router;
