"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePass = exports.cryptPass = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cryptPass = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return hash;
};
exports.cryptPass = cryptPass;
const comparePass = (reqPass, userPass) => {
    return bcryptjs_1.default.compareSync(reqPass, userPass); // true
};
exports.comparePass = comparePass;
