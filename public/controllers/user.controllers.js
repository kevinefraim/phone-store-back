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
exports.loginUser = exports.deleteUserById = exports.updateUserById = exports.readUserById = exports.readUsers = exports.registerUser = void 0;
const db_1 = require("../config/db");
const User_1 = require("../entities/User");
const createJwt_1 = require("../helpers/createJwt");
const cryptPass_1 = require("../helpers/cryptPass");
const validations_1 = require("../helpers/validations");
const userRepo = db_1.AppDataSource.getRepository(User_1.User);
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = req.body;
    try {
        const user = yield userRepo.findOneBy({ email: newData.email });
        if (user)
            throw "El usuario ya existe";
        const hashedPass = (0, cryptPass_1.cryptPass)(newData.password);
        newData.password = hashedPass;
        const newUser = yield userRepo.save(newData);
        return res.json({ ok: true, user: newUser, msg: "Usuario creado" });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //user that tries to login
    const user = req.body;
    try {
        //user that exists with email
        const userExist = yield userRepo.findOneBy({ email: user.email });
        //validating if the email entered is registered
        if (!userExist)
            throw "El usuario no existe";
        //comparing password entered with password registered
        const isValidPass = (0, cryptPass_1.comparePass)(user.password, userExist.password);
        if (!isValidPass)
            throw "Los datos son incorrectos";
        //creating token payload with ID and Email
        const verifiedUser = {
            id: userExist.id,
            email: userExist.email,
        };
        //creating token payload
        const token = yield (0, createJwt_1.createJwt)(verifiedUser);
        return res.json({ ok: true, id: userExist.id, msg: "logged", token });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.loginUser = loginUser;
const readUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepo.find();
        return res.send({ users });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readUsers = readUsers;
const readUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const users = yield userRepo.findOneBy({ id });
        return res.send({ users });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.readUserById = readUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res;
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const deletedUser = yield userRepo.findOneBy({ id });
        (0, validations_1.idValidation)(deletedUser);
        yield userRepo.remove(deletedUser);
        return res.send({
            ok: true,
            message: `User with ID: ${id} deleted`,
            item: deletedUser,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteUserById = deleteUserById;
