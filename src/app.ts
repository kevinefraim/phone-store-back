import { config } from "dotenv";
import express from "express";

import cors from "cors";
import { dbConnection } from "./db";
import phonesRouter from "./routes/Phones.routes";
import brandsRouter from "./routes/Brands.routes";
import usersRouter from "./routes/Users.routes";

config();

const app = express();

app.use(cors());
app.use(express.json());

//DB connection
dbConnection();

//routes
app.use("/phones", phonesRouter);
app.use("/brands", brandsRouter);
app.use("/users", usersRouter);

export default app;
