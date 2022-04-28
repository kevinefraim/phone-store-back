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
    return res.status(200).json({ ok: false, msg: error });
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
    return res.status(200).json({ ok: false, msg: error });
  }
};

//creating item by user
export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phone, quantity } = req.body;
    const { user } = res.locals;
    const cart: any = await cartRepo
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.user", "user")
      .where("cart.user = :user", { user: user.id })
      .getOne();

    const phoneExists = await phoneRepo.findOneBy({ id: phone });

    existenceValidator(cart, "cart");
    existenceValidator(phoneExists, "phone");

    const item = await itemsRepo.save({
      phone,
      quantity,
      user: user.id,
      cart: cart.id,
      subTotal: phoneExists.price,
    });
    console.log(item.subTotal);

    // selecting phone by phone id passed in req.body
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
    return res.status(200).json({ ok: false, msg: error });
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
    console.log(deletedItem);

    // //cart that contains the item
    const cartExists = await cartRepo.findOneBy({ id: deletedItem.cart.id });
    idValidation(cartExists);
    // console.log(deletedItem.subTotal);

    cartExists.total = cartExists.total - +deletedItem.subTotal;
    console.log(cartExists.total);

    cartExists.quantity -= 1;
    //remove selected item
    await itemsRepo.remove(deletedItem);

    //modify total
    await cartRepo.save(cartExists);

    return res.send({
      ok: true,
      message: `Item ${id} deleted`,
      item: deletedItem,
    });
    return res.json({ ok: true });
  } catch (error) {
    return res.status(200).json({ ok: false, msg: error });
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
    const item1 = await itemsRepo.findOne({ where: { id: id } });
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
    item.subTotal = item.phone.price * quantity;

    await itemsRepo.save(item);
    console.log(item);

    const userCart = await cartRepo
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.user", "user")
      .leftJoinAndSelect("cart.item", "items")
      .where("cart.user = :user", { user: user.id })
      .getOne();

    //calculo total carrito
    userCart.total = userCart.item.reduce(
      (subTotal, item) => subTotal + +item.subTotal,
      0
    );

    await cartRepo.save(userCart);

    //return item updated
    const newItem = await itemsRepo.findOne({
      where: { id: item.id },
      relations: { cart: true, phone: true },
    });

    return res.send({ newItem });
  } catch (error) {
    return res.status(200).json({ ok: false, msg: error });
  }
};

export const deleteAllItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = res.locals;
  try {
    const userCart = await cartRepo
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.user", "user")
      .where("cart.user = :user", { user: user.id })
      .getOne();

    const deletedItem = await itemsRepo
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where("user.id = :id", { id: user.id })
      .execute();

    //setting cart quantity to 0
    userCart.quantity = 0;

    //setting cart total to 0
    userCart.total = 0;
    await cartRepo.save(userCart);
    return res.json({ ok: true, deletedItem });
  } catch (error) {
    return res.status(200).json({ ok: false, msg: error });
  }
};
