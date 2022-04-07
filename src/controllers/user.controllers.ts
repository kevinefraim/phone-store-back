import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { createJwt } from "../helpers/createJwt";
import { comparePass, cryptPass } from "../helpers/cryptPass";
import { userVerify } from "../types";

const userRepo = AppDataSource.getRepository(User);

const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const newData = req.body;

  try {
    const user = await userRepo.findOneBy({ email: newData.email });

    if (user) throw "El usuario ya existe";
    const hashedPass = cryptPass(newData.password);
    newData.password = hashedPass;

    const newUser = await userRepo.save(newData);
    return res.json({ ok: true, user: newUser, msg: "Usuario creado" });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const user = req.body;
  try {
    const userExist = await userRepo.findOneBy({ email: user.email });

    if (!userExist) throw "El usuario no existe";

    const isValidPass = comparePass(user.password, userExist.password);
    if (!isValidPass) throw "Los datos son incorrectos";
    const verifiedUser: userVerify = {
      id: userExist.id,
      email: userExist.email,
    };
    const token = await createJwt(verifiedUser);
    return res.json({ ok: true, id: userExist.id, msg: "logged", token });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readUsers = async (req: Request, res: Response): Promise<Response> => {
  return res.send("users");
};
const readUserById = async (req: Request, res: Response): Promise<Response> => {
  return res;
};
const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res;
};
const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res;
};
export {
  registerUser,
  readUsers,
  readUserById,
  updateUserById,
  deleteUserById,
  loginUser,
};
