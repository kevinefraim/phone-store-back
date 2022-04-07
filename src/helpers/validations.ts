import { Phone } from "../entities/Phone";

//validate if item with ID selected exists
export const idValidation = (item: object) => {
  if (!item) throw `El item con el ID seleccionado no existe`;
};

//validate if the object type is correct
export const typeValidation = (item: Phone) => {
  if (typeof item.name !== "string") throw "El name debe ser un string";
  if (typeof item.description !== "string")
    throw "La descripcion debe ser un string";
};
