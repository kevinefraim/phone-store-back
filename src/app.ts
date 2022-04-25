import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/db";
import phonesRouter from "./routes/Phones.routes";
import brandsRouter from "./routes/Brands.routes";
import usersRouter from "./routes/Users.routes";
import itemsRouter from "./routes/CartItem.routes";
import cartRouter from "./routes/Cart.routes";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", ""],
  })
);
app.use(express.json());
app.use(cookieParser());

//DB connection
dbConnection();

//routes
app.use("/phones", phonesRouter);
app.use("/brands", brandsRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/cart", cartRouter);
app.get("/", (req, res) => res.send(`PhoneStore API - Kevin Efraim`));
//initializing app in port
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

export default app;
