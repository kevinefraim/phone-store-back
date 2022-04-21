"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const Phones_routes_1 = __importDefault(require("./routes/Phones.routes"));
const Brands_routes_1 = __importDefault(require("./routes/Brands.routes"));
const Users_routes_1 = __importDefault(require("./routes/Users.routes"));
const CartItem_routes_1 = __importDefault(require("./routes/CartItem.routes"));
const Cart_routes_1 = __importDefault(require("./routes/Cart.routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//DB connection
(0, db_1.dbConnection)();
//routes
app.use("/phones", Phones_routes_1.default);
app.use("/brands", Brands_routes_1.default);
app.use("/users", Users_routes_1.default);
app.use("/items", CartItem_routes_1.default);
app.use("/cart", Cart_routes_1.default);
// app.use("/", (req, res) => res.send("hola"));
//initializing app in port
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
exports.default = app;