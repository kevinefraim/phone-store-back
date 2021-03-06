import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Cart, User } from "../entities";
import { createJwt } from "../helpers/createJwt";
import { comparePass, cryptPass } from "../helpers/cryptPass";
import { idValidation } from "../helpers/validations";
import { userTokenPayload } from "../ts/types";

const userRepo = AppDataSource.getRepository(User);
const cartRepo = AppDataSource.getRepository(Cart);

//register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newData = req.body;

  try {
    const user = await userRepo.findOneBy({ email: newData.email });

    if (user) throw "El usuario ya existe";
    const hashedPass = cryptPass(newData.password);
    newData.password = hashedPass;

    const newUser = await userRepo.save(newData);

    //creating token payload with ID and Email
    const verifiedUser: userTokenPayload = {
      id: newUser.id,
      email: newUser.email,
    };

    //creating token payload
    const token = await createJwt(verifiedUser);

    const newCart = {
      user: newUser.id,
    };
    await cartRepo.save(newCart);

    return res.json({ ok: true, token, user: newUser, msg: "Usuario creado" });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

//login a existing user
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //user that tries to login
  const user = req.body;
  try {
    //user that exists with email
    const loginUser = await userRepo.findOneBy({ email: user.email });

    //validating if the email entered is registered
    if (!loginUser)
      res.status(400).json({ ok: false, msg: "El usuario no existe" });

    //comparing password entered with password registered
    const isValidPass = comparePass(user.password, loginUser.password);
    if (!isValidPass) throw "Los datos son incorrectos";

    //creating token payload with ID and Email
    const verifiedUser: userTokenPayload = {
      id: loginUser.id,
      email: loginUser.email,
    };

    //creating token payload
    const token = await createJwt(verifiedUser);

    return res.json({ ok: true, token, msg: "logged", loginUser });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

//login admin user

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //user that tries to login
  const { email, password } = req.body;
  try {
    //user that exists with email
    const loginUser = await userRepo.findOneBy({ email: email });
    //validating if the email entered is registered
    if (!loginUser)
      res.status(400).json({ ok: false, msg: "El usuario no existe" });

    //validating if user is admin
    if (!loginUser.isAdmin) throw "Usuario incorrecto";

    //comparing password entered with password registered
    const isValidPass = comparePass(password, loginUser.password);
    if (!isValidPass) throw "Los datos son incorrectos";

    //creating token payload with ID and Email
    const verifiedUser: userTokenPayload = {
      id: loginUser.id,
      email: loginUser.email,
    };

    //creating token payload
    const token = await createJwt(verifiedUser);

    return res.json({ ok: true, token, msg: "logged", loginUser });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

//admin reading all users
export const readUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await userRepo.find();

    return res.send({ users });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

//admin reads one user by ID
export const readUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const users = await userRepo.findOneBy({ id });

    return res.send({ users });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

//update user data
export const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updateData = req.body;
    const { user } = res.locals;
    const userToUpdate = await userRepo.findOne({ where: { id: user.id } });

    userRepo.merge(userToUpdate, updateData);
    const updatedPhone = await userRepo.save(userToUpdate);

    const newUpdatedUser = await userRepo.findOne({
      where: { id: updatedPhone.id },
    });

    return res.send({ newUpdatedUser });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

//delete user by id
export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const deletedUser = await userRepo.findOneBy({ id });
    idValidation(deletedUser);
    await userRepo.remove(deletedUser);
    return res.send({
      ok: true,
      message: `User with ID: ${id} deleted`,

      item: deletedUser,
    });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};

export const reLogUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = res.locals;
    const loggedUser = await userRepo.findOneBy({ id: user.id });
    return res.status(200).json({ ok: true, user: loggedUser });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};
