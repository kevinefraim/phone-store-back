import { Phone } from "../entities/Phone";

//validate if item with ID selected exists
export const idValidation = (item: object) => {
  if (!item) throw `El item con el ID seleccionado no existe`;
};
