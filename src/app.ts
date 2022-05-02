import { config } from "dotenv";
import express, { Request } from "express";
import cors from "cors";
import { dbConnection } from "./config/db";
import phonesRouter from "./routes/Phones.routes";
import brandsRouter from "./routes/Brands.routes";
import usersRouter from "./routes/Users.routes";
import itemsRouter from "./routes/CartItem.routes";
import cartRouter from "./routes/Cart.routes";
import msgRouter from "./routes/Messages.routes";
import multer from "multer";
import path from "path";
import { FileNameCallback } from "./ts/types";
import { cloudinaryConfig } from "./config/cloudinary";

config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));
cloudinaryConfig();

//DB connection
dbConnection();

//routes
app.use("/phones", phonesRouter);
app.use("/brands", brandsRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/cart", cartRouter);
app.use("/message", msgRouter);
app.get("/", (req, res) => res.send(`PhoneStore API - Kevin Efraim`));
//initializing app in port
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

export default app;
