import bcrypt from "bcryptjs";

export const cryptPass = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePass = (reqPass: string, userPass: string): boolean => {
  return bcrypt.compareSync(reqPass, userPass); // true
};
