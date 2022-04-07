import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Phone } from "../entities/Phone";
import { idValidation, typeValidation } from "../helpers/validations";

const phonesRepo = AppDataSource.getRepository(Phone);

//Read ALL the phones
export const getPhones = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const phones = await phonesRepo.find({
      relations: {
        brand: true,
      },
    });
    return res.send({ token: res.locals.user.newToken, phones });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//Read ONE phone by ID
export const getPhoneById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const phone = await phonesRepo.findOneBy({ id });
    idValidation(phone);
    return res.send({ token: res.locals.user.newToken, phone });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//create phone
export const createPhone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newPhone = req.body;

    const phone = await phonesRepo.save(newPhone);
    typeValidation(phone);
    return res
      .status(200)
      .send({ ok: true, token: res.locals.user.newToken, phone });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//update phone by ID
export const updatePhone = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const phone = await phonesRepo.findOneBy({ id });
    idValidation(phone);
    phonesRepo.merge(phone, req.body);
    const updatedPhone = await phonesRepo.save(phone);
    return res.send({ token: res.locals.user.newToken, updatedPhone });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//delete phone by ID
export const deletePhone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const deletedPhone = await phonesRepo.findOneBy({ id });
    idValidation(deletedPhone);
    await phonesRepo.remove(deletedPhone);
    return res.send({
      ok: true,
      message: `Item ${id} deleted`,
      token: res.locals.user.newToken,
      item: deletedPhone,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
