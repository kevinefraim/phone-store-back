import { Router } from "express";
import {
  deleteUserById,
  loginUser,
  readUserById,
  readUsers,
  registerUser,
  updateUserById,
} from "../controllers/user.controllers";
import { revToken, validateAdmin } from "../middlewares";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", revToken, validateAdmin, readUsers);
router.get("/:id", revToken, validateAdmin, readUserById);
router.put("/update/:id", revToken, validateAdmin, updateUserById);
router.delete("/delete/:id", revToken, validateAdmin, deleteUserById);

export default router;
