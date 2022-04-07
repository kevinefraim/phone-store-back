import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Phones } from "./entities/Phones";
config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [Phones],
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
