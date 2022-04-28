import { Router } from "express";
import {
  deleteUserById,
  loginAdmin,
  loginUser,
  readUserById,
  readUsers,
  registerUser,
  reLogUser,
  updateUserById,
} from "../controllers/user.controllers";
import { revToken, schemaValidator, validateAdmin } from "../middlewares";
import { loginSchema, registerSchema, userSchema } from "../schemas";

const router = Router();

router.post("/register", schemaValidator(registerSchema), registerUser);
router.post("/login", schemaValidator(loginSchema), loginUser);
router.post("/login/admin", loginAdmin);
router.get("/relog", revToken, reLogUser);
router.get("/", readUsers);
router.get("/:id", revToken, validateAdmin, readUserById);
router.put("/update", revToken, schemaValidator(userSchema), updateUserById);
router.delete("/delete/:id", revToken, validateAdmin, deleteUserById);

export default router;
