import { Router } from "express";
import {
  deleteUserById,
  loginUser,
  readUserById,
  readUsers,
  registerUser,
  updateUserById,
} from "../controllers/user.controllers";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", readUsers);
router.get("/:id", readUserById);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

export default router;
