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
exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.getBrandById = exports.getBrands = void 0;
const db_1 = require("../config/db");
const entities_1 = require("../entities");
const validations_1 = require("../helpers/validations");
const brandsRepo = db_1.AppDataSource.getRepository(entities_1.Brand);
//Read ALL the phones
const getBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield brandsRepo.find();
        return res.send({ brands });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getBrands = getBrands;
//Read ONE phone by ID
const getBrandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const brand = yield brandsRepo.findOneBy({ id });
        (0, validations_1.idValidation)(brand);
        return res.send({ brand });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.getBrandById = getBrandById;
//create phone
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBrand = req.body;
        const brandExist = yield brandsRepo.find({
            where: { name: newBrand.name },
        });
        if (brandExist)
            throw "La marca ya existe";
        const brand = yield brandsRepo.save(newBrand);
        return res.status(200).send({ ok: true, brand });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.createBrand = createBrand;
//supdate phone by ID
const updateBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const brand = yield brandsRepo.findOneBy({ id });
        (0, validations_1.idValidation)(brand);
        brandsRepo.merge(brand, req.body);
        const updatedBrand = yield brandsRepo.save(brand);
        return res.send({ updatedBrand });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.updateBrand = updateBrand;
// //delete phone by ID
const deleteBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const deletedBrand = yield brandsRepo.findOneBy({ id });
        // idValidation(deletedBrand);
        yield brandsRepo.remove(deletedBrand).catch(() => {
            throw "No se puede eliminar la marca, está asociada a un celular";
        });
        return res.send({ deletedBrand });
    }
    catch (error) {
        return res.json({ ok: false, msg: error });
    }
});
exports.deleteBrand = deleteBrand;
