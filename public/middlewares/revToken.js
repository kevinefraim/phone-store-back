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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revToken = void 0;
const createJwt_1 = require("../helpers/createJwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const revToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    if (!token)
        return res.status(401).json({ ok: false, msg: "no está autorizado" });
    const { id, email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_SEED);
    const user = {
        id,
        email,
    };
    const newToken = yield (0, createJwt_1.createJwt)(user);
    res.locals.user = Object.assign(Object.assign({}, user), { newToken });
    next();
});
exports.revToken = revToken;
