import { Phone } from "../entities/Phone";

//validate if item with ID selected exists
export const idValidation = (item: object) => {
  if (!item) throw `El item con el ID seleccionado no existe`;
};

//validate if the object type is correct
export const typeValidation = (item: Phone) => {
  if (typeof item.name !== "string") throw "el name debe ser un string";
};
