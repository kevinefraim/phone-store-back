"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartById = exports.createCart = exports.getCart = void 0;
const db_1 = require("../config/db");
const entities_1 = require("../entities");
const cartRepo = db_1.AppDataSource.getRepository(entities_1.Cart);
//get carts
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cartRepo.find();
        return res.send({ carts });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getCart = getCart;
//creating a new cart
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCart = req.body;
        const cart = yield cartRepo.save(newCart);
        return res.status(200).send({ ok: true, cart });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createCart = createCart;
//get cart by ID
const getCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.params;
    try {
        const cart = yield cartRepo.find({ where: { id: +cartId } });
        return res.status(200).json({ ok: true, cart });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getCartById = getCartById;
