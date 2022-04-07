import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Phones } from "../entities/Phones";
import { idValidation } from "../helpers/idValidation";

const phonesRepo = AppDataSource.getRepository(Phones);

//Read ALL the phones
export const getPhones = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const phones = await phonesRepo.find();
    return res.send(phones);
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
    const id = req.params.id;
    const phone = await phonesRepo.findOneBy({ id });
    idValidation(phone);
    return res.send(phone);
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//create phone
export const createPhones = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newPhone = await phonesRepo.save(req.body);
    return res.status(200).send({ ok: true, Restaurant: newPhone });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//update phone by ID
export const updatePhones = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const phone = await phonesRepo.findOneBy({ id });
    idValidation(phone);
    phonesRepo.merge(phone, req.body);
    const updatedPhone = await phonesRepo.save(phone);
    return res.send(updatedPhone);
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//delete phone by ID
export const deletePhones = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
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
