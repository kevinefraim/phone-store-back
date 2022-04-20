export const existenceValidator = (item: object, desc: string) => {
  if (!item) throw `${desc} entered doesn't exist`;
};
