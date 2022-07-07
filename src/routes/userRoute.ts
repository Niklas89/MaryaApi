import express from "express";
const router = express.Router();
import { getUsers, getRoles, editPassword } from "../controllers/userController";
import { signIn, signUp } from "../controllers/authController";
import isAuth from "../middleware/authMiddleware";

router.get("/", getUsers);
router.get("/roles", getRoles);
router.patch("/password", isAuth, editPassword);
router.post("/register", signUp);
router.post("/login", signIn)

export default router;