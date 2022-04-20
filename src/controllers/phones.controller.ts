import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { AppDataSource } from "../config/db";
import { Phone } from "../entities";
import { idValidation } from "../helpers/validations";

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

    return res.send({ phones });
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
    return res.send({ phone });
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
    const newData = req.body;

    const phone = await phonesRepo.save(newData);

    const newPhone = await phonesRepo.findOne({
      where: { id: phone.id },
      relations: { brand: true },
    });

    return res.status(200).send({ ok: true, newPhone });
  } catch (error) {
    res.json({ ok: false, msg: error });
  }
};

//update phone by ID
export const updatePhone = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const updateData = req.body;
    const phone = await phonesRepo.findOneBy({ id });
    idValidation(phone);

    phonesRepo.merge(phone, updateData);
    const updatedPhone = await phonesRepo.save(phone);

    const newUpdatedPhone = await phonesRepo.findOne({
      where: { id: phone.id },
      relations: { brand: true },
    });

    return res.send({ newUpdatedPhone });
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

      item: deletedPhone,
    });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
