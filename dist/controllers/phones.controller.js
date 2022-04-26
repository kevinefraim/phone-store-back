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
exports.deletePhone = exports.updatePhone = exports.createPhone = exports.getPhoneByBrand = exports.getPhoneById = exports.getPhones = void 0;
const db_1 = require("../config/db");
const entities_1 = require("../entities");
const existenceValidator_1 = require("../helpers/existenceValidator");
const validations_1 = require("../helpers/validations");
const phonesRepo = db_1.AppDataSource.getRepository(entities_1.Phone);
const brandRepo = db_1.AppDataSource.getRepository(entities_1.Brand);
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
        res.status(400).json({ ok: false, msg: error });
    }
});
exports.getPhones = getPhones;
//Read ONE phone by ID
const getPhoneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const phone = yield phonesRepo.findOne({
            where: { id: id },
            relations: { brand: true },
        });
        (0, validations_1.idValidation)(phone);
        return res.send({ phone });
    }
    catch (error) {
        res.status(400).json({ ok: false, msg: error });
    }
});
exports.getPhoneById = getPhoneById;
//get phones by brand
const getPhoneByBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = req.params.brand;
    try {
        const filteredPhones = yield phonesRepo
            .createQueryBuilder("phones")
            .leftJoinAndSelect("phones.brand", "brand")
            .where("brand.name = :brand", { brand: brand })
            .getMany();
        if (filteredPhones.length < 1)
            throw "No hay teléfonos de la marca seleccionada";
        return res.status(200).json({ ok: true, filteredPhones });
    }
    catch (error) {
        res.json({ ok: false, msg: error });
    }
});
exports.getPhoneByBrand = getPhoneByBrand;
//create phone
const createPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = req.body;
        const brandExists = yield brandRepo.findOne({
            where: { id: newData.brand },
        });
        (0, existenceValidator_1.existenceValidator)(brandExists, "brand");
        const phone = yield phonesRepo.save(newData);
        const newPhone = yield phonesRepo.findOne({
            where: { id: phone.id },
            relations: { brand: true },
        });
        return res.status(200).send({ ok: true, newPhone });
    }
    catch (error) {
        res.status(400).json({ ok: false, msg: error });
    }
});
exports.createPhone = createPhone;
//update phone by ID
const updatePhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const updateData = req.body;
        const brandExists = yield brandRepo.findOne({
            where: { id: updateData.brand },
        });
        (0, existenceValidator_1.existenceValidator)(brandExists, "brand");
        const phone = yield phonesRepo.findOneBy({ id });
        (0, validations_1.idValidation)(phone);
        phonesRepo.merge(phone, updateData);
        const updatedPhone = yield phonesRepo.save(phone);
        const newUpdatedPhone = yield phonesRepo.findOne({
            where: { id: updatedPhone.id },
            relations: { brand: true },
        });
        return res.send({ newUpdatedPhone });
    }
    catch (error) {
        res.status(400).json({ ok: false, msg: error });
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
        res.status(400).json({ ok: false, msg: error });
    }
});
exports.deletePhone = deletePhone;
