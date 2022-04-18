"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = void 0;
const db_1 = require("../config/db");
const entities_1 = require("../entities");
const cartRepo = db_1.AppDataSource.getRepository(entities_1.Cart);
const getCart = (req, res) => {
    res.send("hola");
};
exports.getCart = getCart;
