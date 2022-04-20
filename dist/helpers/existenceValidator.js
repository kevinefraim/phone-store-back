"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existenceValidator = void 0;
const existenceValidator = (item, desc) => {
    if (!item)
        throw `${desc} entered doesn't exist`;
};
exports.existenceValidator = existenceValidator;
