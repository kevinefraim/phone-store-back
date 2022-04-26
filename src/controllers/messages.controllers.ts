import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Messages } from "../entities";

const messagesRepo = AppDataSource.getRepository(Messages);
