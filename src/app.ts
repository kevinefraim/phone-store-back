import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnection } from "./db";

config();

const app = express();

app.use(cors());
app.use(express.json());

//DB connection
dbConnection();

export default app;
