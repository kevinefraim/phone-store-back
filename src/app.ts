import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnection } from "./config/db";
import phonesRouter from "./routes/Phones.routes";
import brandsRouter from "./routes/Brands.routes";
import usersRouter from "./routes/Users.routes";
import itemsRouter from "./routes/CartItem.routes";
import cartRouter from "./routes/Cart.routes";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//DB connection
dbConnection();

//routes
app.use("/phones", phonesRouter);
app.use("/brands", brandsRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/cart", cartRouter);

//initializing app in port
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

export default app;
