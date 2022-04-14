import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Brand, CartItem, Phone, User } from "../entities";

config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [Phone, Brand, User, CartItem],
  synchronize: true,
  ssl: false,
});

export const dbConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Conectado a la DB");
  } catch (error) {
    console.log("error en la base de datos", error);
  }
};
