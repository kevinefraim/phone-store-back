import { Response, Request, NextFunction } from "express";
import { createJwt } from "../helpers/createJwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userTokenPayload } from "../types";

export const revToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(401).json({ ok: false, msg: "no está autorizado" });

  const { id, email } = jwt.verify(
    token,
    process.env.JWT_SECRET_SEED
  ) as JwtPayload;

  const user: userTokenPayload = {
    id,
    email,
  };

  const newToken = await createJwt(user);
  res.locals.user = { ...user, newToken };

  next();
};
