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
const entities_1 = require("../entities");
const validations_1 = require("../helpers/validations");
const itemsRepo = db_1.AppDataSource.getRepository(entities_1.CartItem);
const cartRepo = db_1.AppDataSource.getRepository(entities_1.Cart);
//get items by user
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        const items = yield itemsRepo.find({
            where: {
                user: { id: user.id },
            },
            relations: {
                user: true,
                phone: true,
                cart: true,
            },
        });
        return res.send({ items });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getItems = getItems;
//get one item by user
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const { user } = res.locals;
        const item = yield itemsRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                phone: true,
                cart: true,
            },
        });
        (0, validations_1.idValidation)(item);
        (0, validations_1.userValidation)(user.id, item.user.id);
        return res.send({
            ok: true,
            item,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getItemById = getItemById;
//creating item by user
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, cart } = req.body;
        const { user } = res.locals;
        const cartExists = yield cartRepo.findOneBy({ id: cart });
        (0, validations_1.idValidation)(cartExists);
        const item = yield itemsRepo.save({ phone, user: user.id, cart });
        //selecting phone by phone id passed in req.body
        const { price } = yield db_1.AppDataSource.getRepository(entities_1.Phone).findOneBy({
            id: phone,
        });
        //adding total
        cartExists.total += price * +item.quantity;
        //saving total in cart
        yield cartRepo.save(cartExists);
        return res.status(200).send({ ok: true, item });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createItem = createItem;
//delete item by user
const deleteItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        const id = +req.params.id;
        //select item by user id and id
        const deletedItem = yield itemsRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                cart: true,
                phone: true,
            },
        });
        (0, validations_1.idValidation)(deletedItem);
        (0, validations_1.userValidation)(user.id, deletedItem.user.id);
        //cart that contains the item
        const cartExists = yield cartRepo.findOneBy({ id: deletedItem.cart.id });
        (0, validations_1.idValidation)(cartExists);
        cartExists.total -= deletedItem.phone.price * +deletedItem.quantity;
        //remove selected item
        yield itemsRepo.remove(deletedItem);
        //modify total
        yield cartRepo.save(cartExists);
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
//update item by user
const updateItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const { user } = res.locals;
        const { quantity } = req.body;
        const item = yield itemsRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                phone: true,
                cart: true,
            },
        });
        (0, validations_1.userValidation)(user.id, item.user.id);
        (0, validations_1.idValidation)(item);
        item.quantity = quantity;
        yield itemsRepo.save(item);
        const cart = yield cartRepo.findOne({
            where: {
                id: item.cart.id,
            },
        });
        cart.total = item.phone.price * +item.quantity;
        yield cartRepo.save(cart);
        return res.send({ item });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updateItemById = updateItemById;
