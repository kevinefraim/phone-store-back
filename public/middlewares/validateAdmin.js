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
exports.validateAdmin = void 0;
const db_1 = require("../config/db");
const User_1 = require("../entities/User");
const validateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals.user;
    const { isAdmin } = yield db_1.AppDataSource.getRepository(User_1.User).findOneBy({ id });
    console.log(isAdmin);
    if (!isAdmin)
        return res.status(401).json({
            ok: false,
            msg: "no tiene permiso para realizar esta accion",
            errorCode: 800,
        });
    next();
});
exports.validateAdmin = validateAdmin;
