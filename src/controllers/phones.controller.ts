import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { AppDataSource } from "../config/db";
import { Brand, Phone } from "../entities";
import { existenceValidator } from "../helpers/existenceValidator";
import { idValidation } from "../helpers/validations";

const phonesRepo = AppDataSource.getRepository(Phone);
const brandRepo = AppDataSource.getRepository(Brand);

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
    const phone = await phonesRepo.findOne({
      where: { id: id },
      relations: { brand: true },
    });
    idValidation(phone);
    return res.send({ phone });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//get phones by brand

export const getPhoneByBrand = async (req: Request, res: Response) => {
  const brand = req.params.brand;
  try {
    const filteredPhones = await phonesRepo
      .createQueryBuilder("phones")
      .leftJoinAndSelect("phones.brand", "brand")
      .where("brand.name = :brand", { brand: brand })
      .getMany();
    return res.status(200).json({ ok: true, filteredPhones });
  } catch (error) {
    res.json({ ok: false, msg: error });
  }
};

//create phone
export const createPhone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newData = req.body;

    const brandExists = await brandRepo.findOne({
      where: { id: newData.brand },
    });
    existenceValidator(brandExists, "brand");

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
    const brandExists = await brandRepo.findOne({
      where: { id: updateData.brand },
    });
    existenceValidator(brandExists, "brand");
    const phone = await phonesRepo.findOneBy({ id });
    idValidation(phone);

    phonesRepo.merge(phone, updateData);
    const updatedPhone = await phonesRepo.save(phone);

    const newUpdatedPhone = await phonesRepo.findOne({
      where: { id: updatedPhone.id },
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
