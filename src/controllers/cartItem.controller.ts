import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Cart, Phone } from "../entities";
import { CartItem } from "../entities/CartItem";
import { idValidation, userValidation } from "../helpers/validations";

const itemsRepo = AppDataSource.getRepository(CartItem);

export const getItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = res.locals;
    const items = await itemsRepo.find({
      where: {
        user: { id: user.id },
      },
      relations: {
        user: true,
        phone: true,
        cart: true,
      },
    });

    return res.send({ items });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
export const getItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const { user } = res.locals;
    const item = await itemsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        phone: true,
      },
    });
    idValidation(item);
    userValidation(user.id, item.user.id);
    return res.send({
      ok: true,
      item,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cartRepo = await AppDataSource.getRepository(Cart);
  try {
    const { phone, cart } = req.body;
    const { user } = res.locals;
    const cartExists = await cartRepo.findOneBy({ id: cart });
    idValidation(cartExists);

    const item = await itemsRepo.save({ phone, user: user.id, cart });

    //selecting phone by phone id passed in req.body
    const { price } = await AppDataSource.getRepository(Phone).findOneBy({
      id: phone,
    });

    //adding total
    cartExists.total += price;

    //saving total in cart
    await cartRepo.save(cartExists);

    return res.status(200).send({ ok: true, item });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
export const deleteItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cartRepo = await AppDataSource.getRepository(Cart);
  try {
    const { user } = res.locals;
    const id = +req.params.id;
    const cartId = +req.params.cartId;

    //cart that contains the item
    const cartExists = await cartRepo.findOneBy({ id: cartId });
    idValidation(cartExists);

    //select item by user id and id
    const deletedItem = await itemsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        phone: true,
      },
    });
    idValidation(deletedItem);
    userValidation(user.id, deletedItem.user.id);

    cartExists.total -= deletedItem.phone.price;

    //remove selected item
    await itemsRepo.remove(deletedItem);

    //modify total
    await cartRepo.save(cartExists);

    return res.send({
      ok: true,
      message: `Item ${id} deleted`,
      item: deletedItem,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
export const updateItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const { user } = res.locals;
    const item = await itemsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        phone: true,
      },
    });

    userValidation(user.id, item.user.id);
    idValidation(item);

    itemsRepo.merge(item, req.body);
    const updatedItem = await itemsRepo.save(item);

    return res.send({ updatedItem });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
