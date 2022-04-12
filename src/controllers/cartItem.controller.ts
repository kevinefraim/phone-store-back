import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { CartItem } from "../entities/CartItem";

const itemsRepo = AppDataSource.getRepository(CartItem);

export const getItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const items = await itemsRepo.find({
      relations: {
        phone: true,
        user: true,
      },
    });

    return res.send({ items });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
export const getItemById = (req: Request, res: Response) => {
  return res.send("get one item");
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newItem = req.body;

    const item = await itemsRepo.save(newItem);

    return res.status(200).send({ ok: true, item });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
export const deleteItemById = (req: Request, res: Response) => {
  return res.send("delete item");
};
export const updateItemById = (req: Request, res: Response) => {
  return res.send("update item");
};
