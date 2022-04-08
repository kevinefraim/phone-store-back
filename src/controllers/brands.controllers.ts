import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Brand } from "../entities/Brand";
import { Phone } from "../entities/Phone";
import { idValidation } from "../helpers/validations";

const brandsRepo = AppDataSource.getRepository(Brand);

//Read ALL the phones
export const getBrands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const brands = await brandsRepo.find();
    return res.send({ brands });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//Read ONE phone by ID
export const getBrandById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const brand = await brandsRepo.findOneBy({ id });
    idValidation(brand);
    return res.send({ brand });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//create phone
export const createBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBrand = req.body;

    const brand = await brandsRepo.save(newBrand);

    return res.status(200).send({ ok: true, brand });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

//supdate phone by ID
export const updateBrand = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const brand = await brandsRepo.findOneBy({ id });
    idValidation(brand);
    brandsRepo.merge(brand, req.body);
    const updatedBrand = await brandsRepo.save(brand);
    return res.send({ updatedBrand });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};

// //delete phone by ID
export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = +req.params.id;
    const deletedBrand = await brandsRepo.findOneBy({ id });
    // idValidation(deletedBrand);
    await brandsRepo.remove(deletedBrand).catch(() => {
      throw "No se puede eliminar la marca, está asociada a un celular";
    });

    return res.send({ deletedBrand });
  } catch (error) {
    return res.json({ ok: false, msg: error });
  }
};
