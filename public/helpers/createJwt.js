"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//function that creates JWT token
const createJwt = (user) => {
    return new Promise((resolve, reject) => {
        const payload = { id: user.id, email: user.email };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_SEED, {
            expiresIn: "2h",
        }, (error, token) => {
            if (error) {
                console.warn(error);
                reject("No se generó el token");
            }
            resolve(token);
        });
    });
};
exports.createJwt = createJwt;
