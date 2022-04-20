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
exports.deleteUserById = exports.updateUserById = exports.readUserById = exports.readUsers = exports.loginUser = exports.registerUser = void 0;
const db_1 = require("../config/db");
const entities_1 = require("../entities");
const createJwt_1 = require("../helpers/createJwt");
const cryptPass_1 = require("../helpers/cryptPass");
const validations_1 = require("../helpers/validations");
const userRepo = db_1.AppDataSource.getRepository(entities_1.User);
//register a new user
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
//login a existing user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //user that tries to login
    const user = req.body;
    try {
        //user that exists with email
        const loginUser = yield userRepo.findOneBy({ email: user.email });
        //validating if the email entered is registered
        if (!loginUser)
            throw "El usuario no existe";
        //comparing password entered with password registered
        const isValidPass = (0, cryptPass_1.comparePass)(user.password, loginUser.password);
        if (!isValidPass)
            throw "Los datos son incorrectos";
        //creating token payload with ID and Email
        const verifiedUser = {
            id: loginUser.id,
            email: loginUser.email,
        };
        //creating token payload
        const token = yield (0, createJwt_1.createJwt)(verifiedUser);
        return res.json({ ok: true, token, msg: "logged", loginUser });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.loginUser = loginUser;
//admin reading all users
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
//admin reads one user by ID
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
//update user data
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = req.body;
        const { user } = res.locals;
        const userToUpdate = yield userRepo.findOne({ where: { id: user.id } });
        userRepo.merge(userToUpdate, updateData);
        const updatedPhone = yield userRepo.save(userToUpdate);
        const newUpdatedUser = yield userRepo.findOne({
            where: { id: updatedPhone.id },
        });
        return res.send({ newUpdatedUser });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updateUserById = updateUserById;
//delete user by id
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
