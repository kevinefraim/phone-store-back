import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Cart } from "../entities";

const cartRepo = AppDataSource.getRepository(Cart);

export const getCart = (req: Request, res: Response) => {
  res.send("hola");
};
