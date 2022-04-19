"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.idValidation = void 0;
//validate if item with ID selected exists
const idValidation = (item) => {
    if (!item)
        throw `El item con el ID seleccionado no existe`;
};
exports.idValidation = idValidation;
//validation if item belongs to user
const userValidation = (userId, itemUserId) => {
    if (userId !== itemUserId)
        throw "No existen items con el ID seleccionado";
};
exports.userValidation = userValidation;
