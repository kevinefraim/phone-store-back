import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entities/User";

export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = res.locals.user;

  const { isAdmin } = await AppDataSource.getRepository(User).findOneBy({ id });
  console.log(isAdmin);

  if (!isAdmin)
    return res
      .status(401)
      .json({
        ok: false,
        msg: "no tiene permiso para realizar esta accion",
        errorCode: 800,
      });

  next();
};
