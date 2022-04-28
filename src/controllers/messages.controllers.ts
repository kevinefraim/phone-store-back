import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Messages } from "../entities";

const messagesRepo = AppDataSource.getRepository(Messages);

export const createMsg = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phoneNumber, message, fullName } = req.body;

    const newMessage = await messagesRepo.save({
      fullName,
      phoneNumber,
      message,
    });
    return res.status(200).json({ ok: true, newMessage });
  } catch (error) {
    return res.status(400).json({ ok: false, error });
  }
};
