//validate if item with ID selected exists
export const idValidation = (item: object) => {
  if (!item) throw `El item con el ID seleccionado no existe`;
};

//validation if item belongs to user

export const userValidation = (userId: number, itemUserId: number) => {
  if (userId !== itemUserId) throw "No existen items con el ID seleccionado";
};
