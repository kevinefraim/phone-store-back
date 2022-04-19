import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

//revalidating token and creating a new one
export const revToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  try {
    if (!token)
      return res.status(401).json({ ok: false, msg: "no está autorizado" });

    const user = jwt.verify(
      token,
      process.env.JWT_SECRET_SEED,
      (err, decoded) => {
        if (err) {
          throw "token expirado";
        }
        res.locals.user = decoded;
      }
    );

    next();
  } catch (error) {
    return res.status(401).json({ ok: false, msg: error });
  }
};
