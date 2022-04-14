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
exports.updateItemById = exports.deleteItemById = exports.createItem = exports.getItemById = exports.getItems = void 0;
const db_1 = require("../config/db");
const CartItem_1 = require("../entities/CartItem");
const validations_1 = require("../helpers/validations");
const itemsRepo = db_1.AppDataSource.getRepository(CartItem_1.CartItem);
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield itemsRepo.findOne({
            where: {
                user: { id: res.locals.user.id },
            },
            relations: {
                user: true,
                phone: true,
            },
        });
        return res.send({ items });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getItems = getItems;
const getItemById = (req, res) => {
    return res.send("get one item");
};
exports.getItemById = getItemById;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = req.body;
        const item = yield itemsRepo.save(newItem);
        return res.status(200).send({ ok: true, item });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createItem = createItem;
const deleteItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.locals.user;
        console.log(res.locals.user);
        const id = +req.params.id;
        const deletedItem = yield itemsRepo.findOne({
            where: {
                user: { id: res.locals.user.id },
                id: id,
            },
            relations: {
                user: true,
                phone: true,
            },
        });
        (0, validations_1.idValidation)(deletedItem);
        yield itemsRepo.remove(deletedItem);
        return res.send({
            ok: true,
            message: `Item ${id} deleted`,
            item: deletedItem,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteItemById = deleteItemById;
const updateItemById = (req, res) => {
    return res.send("update item");
};
exports.updateItemById = updateItemById;
