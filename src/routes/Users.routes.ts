import { Router } from "express";
import {
  deleteUserById,
  loginUser,
  readUserById,
  readUsers,
  registerUser,
  updateUserById,
} from "../controllers/user.controllers";
import { revToken, schemaValidator, validateAdmin } from "../middlewares";
import { loginSchema, registerSchema } from "../schemas";

const router = Router();

router.post("/register", schemaValidator(registerSchema), registerUser);
router.post("/login", schemaValidator(loginSchema), loginUser);
router.get("/", revToken, validateAdmin, readUsers);
router.get("/:id", revToken, validateAdmin, readUserById);
router.put("/update/:id", revToken, validateAdmin, updateUserById);
router.delete("/delete/:id", revToken, validateAdmin, deleteUserById);

export default router;
