import bcrypt from "bcryptjs";

//function that crypts users password
export const cryptPass = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

//function that compare crypted pass with login pass
export const comparePass = (reqPass: string, userPass: string): boolean => {
  return bcrypt.compareSync(reqPass, userPass); // true
};
