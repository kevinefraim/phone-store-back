import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities";

//validating admin
export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = res.locals.user;

  const { isAdmin } = await AppDataSource.getRepository(User).findOneBy({ id });

  if (!isAdmin) {
    res.status(401).json({
      ok: false,
      msg: "no tiene permiso para realizar esta accion",
      errorCode: 800,
    });
  } else {
    next();
  }
};
