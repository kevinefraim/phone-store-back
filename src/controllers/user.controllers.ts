import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { createJwt } from "../helpers/createJwt";
import { comparePass, cryptPass } from "../helpers/cryptPass";
import { userTokenPayload } from "../types";

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
  //user that tries to login
  const user = req.body;
  try {
    //user that exists with email
    const userExist = await userRepo.findOneBy({ email: user.email });

    //validating if the email entered is registered
    if (!userExist) throw "El usuario no existe";

    //comparing password entered with password registered
    const isValidPass = comparePass(user.password, userExist.password);
    if (!isValidPass) throw "Los datos son incorrectos";

    //creating token payload with ID and Email
    const verifiedUser: userTokenPayload = {
      id: userExist.id,
      email: userExist.email,
    };

    //creating token payload
    const token = await createJwt(verifiedUser);
    return res.json({ ok: true, id: userExist.id, msg: "logged", token });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

const readUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userRepo.find();

    return res.send({ users });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
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
