import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Brand, Image, Phone } from "../entities";
import { existenceValidator } from "../helpers/existenceValidator";
import { idValidation } from "../helpers/validations";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs-extra";

const phonesRepo = AppDataSource.getRepository(Phone);
const brandRepo = AppDataSource.getRepository(Brand);
const imgRepo = AppDataSource.getRepository(Image);

//Read ALL the phones
export const getPhones = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const phones = await phonesRepo.find({
      relations: {
        brand: true,
        image: true,
      },
    });

    return res.send({ phones });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error });
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
      relations: { brand: true, image: true },
    });
    idValidation(phone);
    return res.send({ phone });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error });
  }
};

//get phones by brand

export const getPhoneByBrand = async (req: Request, res: Response) => {
  const brand = req.params.brand;
  try {
    const filteredPhones = await phonesRepo
      .createQueryBuilder("phones")
      .leftJoinAndSelect("phones.brand", "brand")
      .leftJoinAndSelect("phones.image", "image")
      .where("brand.name = :brand", { brand: brand })
      .getMany();
    if (filteredPhones.length < 1)
      throw "No hay teléfonos de la marca seleccionada";
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
  console.log(req.file);

  try {
    const newData = req.body;
    const { path } = req.file;

    const brandExists = await brandRepo.findOne({
      where: { id: newData.brand },
    });
    existenceValidator(brandExists, "brand");

    newData.price = +newData.price;
    newData.brand = +newData.brand;
    newData.stock = +newData.stock;

    const { url, public_id } = await cloudinary.uploader.upload(path);

    const image = await imgRepo.save({
      url,
      public_id,
    });

    const phone = await phonesRepo.save({ ...newData, image: image.id });

    const newPhone = await phonesRepo.findOne({
      where: { id: phone.id },
      relations: { brand: true, image: true },
    });
    await fs.unlink(path);
    return res.status(200).send({ ok: true, newPhone });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error });
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
    res.status(400).json({ ok: false, msg: error });
  }
};

//delete phone by ID
export const deletePhone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const deletedPhone = await phonesRepo.findOne({
      where: { id },
      relations: { image: true },
    });
    idValidation(deletedPhone);

    const imgDelete = await imgRepo.findOne({
      where: { id: deletedPhone.image.id },
    });
    await phonesRepo.remove(deletedPhone);
    await cloudinary.uploader.destroy(imgDelete.public_id);
    await imgRepo.remove(imgDelete);

    return res.send({
      ok: true,
      message: `Item ${id} deleted`,

      item: deletedPhone,
    });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error });
  }
};
