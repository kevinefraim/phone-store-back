import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Cart, CartItem, Phone, User } from "../entities";
import { existenceValidator } from "../helpers/existenceValidator";
import { idValidation, userValidation } from "../helpers/validations";

const itemsRepo = AppDataSource.getRepository(CartItem);
const cartRepo = AppDataSource.getRepository(Cart);
const phoneRepo = AppDataSource.getRepository(Phone);
const userRepo = AppDataSource.getRepository(User);

//get items by user
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

//get one item by user
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
        cart: true,
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

//creating item by user
export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phone } = req.body;
    const { user } = res.locals;
    const cart: any = await cartRepo
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.user", "user")
      .where("cart.user = :user", { user: user.id })
      .getOne();
    console.log(cart);

    const phoneExists = await phoneRepo.findOneBy({ id: phone });

    existenceValidator(cart, "cart");
    existenceValidator(phoneExists, "phone");

    const item = await itemsRepo.save({
      phone,
      user: user.id,
      cart: cart.id,
    });

    //selecting phone by phone id passed in req.body
    const { price } = await AppDataSource.getRepository(Phone).findOneBy({
      id: phone,
    });

    // adding total
    cart.total += price * +item.quantity;
    cart.quantity += 1;
    // saving total in cart
    await cartRepo.save(cart);

    const newItem = await itemsRepo.findOne({
      where: { id: item.id },
      relations: { cart: true, phone: true },
    });

    return res.status(200).send({ ok: true, newItem });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//delete item by user
export const deleteItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = res.locals;
    const id = +req.params.id;

    //select item by user id and id
    const deletedItem = await itemsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        cart: true,
        phone: true,
      },
    });
    idValidation(deletedItem);
    userValidation(user.id, deletedItem.user.id);

    //cart that contains the item
    const cartExists = await cartRepo.findOneBy({ id: deletedItem.cart.id });
    idValidation(cartExists);

    cartExists.total -= deletedItem.phone.price * +deletedItem.quantity;

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

//update item by user
export const updateItemById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const { user } = res.locals;
    const { quantity } = req.body;
    const item = await itemsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        phone: true,
        cart: true,
      },
    });

    userValidation(user.id, item.user.id);
    idValidation(item);

    item.quantity = quantity;
    await itemsRepo.save(item);

    const cart = await cartRepo.findOne({
      where: {
        id: item.cart.id,
      },
    });

    cart.total = item.phone.price * +item.quantity;

    await cartRepo.save(cart);

    //return item updated
    const newItem = await itemsRepo.findOne({
      where: { id: item.id },
      relations: { cart: true, phone: true },
    });

    return res.send({ newItem });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

export const getItemsByCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = res.locals;
  try {
    const userCart = await cartRepo.findOne({ where: { user: user.id } });

    const filteredItems = await itemsRepo
      .createQueryBuilder("cartItems")
      .leftJoinAndSelect("cartItems.cart", "cart")
      .leftJoinAndSelect("cartItems.user", "user")
      .leftJoinAndSelect("cartItems.phone", "phone")
      .where("cartItems.user = :user", { user: user.id })
      .andWhere("cartItems.cart = :cart", { cart: userCart.id })
      .getMany();
    console.log(filteredItems);

    return res.status(200).json({ ok: true, filteredItems });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
