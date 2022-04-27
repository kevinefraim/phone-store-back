import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Cart } from "../entities";

const cartRepo = AppDataSource.getRepository(Cart);

//get cart by ID
export const getCartById = async (req: Request, res: Response) => {
  const { user } = res.locals;
  try {
    const cart = await cartRepo
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.user", "user")
      .where("cart.user = :user", { user: user.id })
      .getOne();

    return res.status(200).json({ ok: true, cart });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error });
  }
};
