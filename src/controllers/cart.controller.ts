import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Cart } from "../entities";

const cartRepo = AppDataSource.getRepository(Cart);

//get carts
export const getCart = async (req: Request, res: Response) => {
  try {
    const carts = await cartRepo.find();

    return res.send({ carts });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//creating a new cart
export const createCart = async (req: Request, res: Response) => {
  try {
    const newCart = req.body;

    const cart = await cartRepo.save(newCart);

    return res.status(200).send({ ok: true, cart });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//get cart by ID
export const getCartById = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  try {
    const cart = await cartRepo.find({ where: { id: +cartId } });

    return res.status(200).json({ ok: true, cart });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
