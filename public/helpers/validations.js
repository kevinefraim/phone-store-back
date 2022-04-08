"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeValidation = exports.idValidation = void 0;
//validate if item with ID selected exists
const idValidation = (item) => {
    if (!item)
        throw `El item con el ID seleccionado no existe`;
};
exports.idValidation = idValidation;
//validate if the object type is correct
const typeValidation = (item) => {
    if (typeof item.name !== "string")
        throw "El name debe ser un string";
    if (typeof item.description !== "string")
        throw "La descripcion debe ser un string";
};
exports.typeValidation = typeValidation;
