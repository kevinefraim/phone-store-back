"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = void 0;
//validate if item with ID selected exists
const idValidation = (item) => {
    if (!item)
        throw `El item con el ID seleccionado no existe`;
};
exports.idValidation = idValidation;
