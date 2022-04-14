import { Request, Response } from "express";
import { userInfo } from "os";
import { AppDataSource } from "../config/db";
import { CartItem } from "../entities/CartItem";
import { idValidation } from "../helpers/validations";

const itemsRepo = AppDataSource.getRepository(CartItem);

export const getItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const items = await itemsRepo.findOne({
      where: {
        user: { id: res.locals.user.id },
      },
      relations: {
        user: true,
        phone: true,
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
export const deleteItemById = async (req: Request, res: Response) => {
  try {
    res.locals.user;
    console.log(res.locals.user);

    const id = +req.params.id;
    const deletedItem = await itemsRepo.findOne({
      where: {
        user: { id: res.locals.user.id },
        id: id,
      },
      relations: {
        user: true,
        phone: true,
      },
    });
    idValidation(deletedItem);
    await itemsRepo.remove(deletedItem);
    return res.send({
      ok: true,
      message: `Item ${id} deleted`,

      item: deletedItem,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
export const updateItemById = (req: Request, res: Response) => {
  return res.send("update item");
};
