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
exports.deletePhone = exports.updatePhone = exports.createPhone = exports.getPhoneById = exports.getPhones = void 0;
const db_1 = require("../db");
const Phone_1 = require("../entities/Phone");
const validations_1 = require("../helpers/validations");
const phonesRepo = db_1.AppDataSource.getRepository(Phone_1.Phone);
//Read ALL the phones
const getPhones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phones = yield phonesRepo.find({
            relations: {
                brand: true,
            },
        });
        return res.send({ phones });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getPhones = getPhones;
//Read ONE phone by ID
const getPhoneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const phone = yield phonesRepo.findOneBy({ id });
        (0, validations_1.idValidation)(phone);
        return res.send({ phone });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getPhoneById = getPhoneById;
//create phone
const createPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPhone = req.body;
        const phone = yield phonesRepo.save(newPhone);
        return res.status(200).send({ ok: true, phone });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createPhone = createPhone;
//update phone by ID
const updatePhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const phone = yield phonesRepo.findOneBy({ id });
        (0, validations_1.idValidation)(phone);
        phonesRepo.merge(phone, req.body);
        const updatedPhone = yield phonesRepo.save(phone);
        return res.send({ updatedPhone });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updatePhone = updatePhone;
//delete phone by ID
const deletePhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const deletedPhone = yield phonesRepo.findOneBy({ id });
        (0, validations_1.idValidation)(deletedPhone);
        yield phonesRepo.remove(deletedPhone);
        return res.send({
            ok: true,
            message: `Item ${id} deleted`,
            item: deletedPhone,
        });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deletePhone = deletePhone;
