import express from "express";
const router = express.Router();
import { getUsers, getRoles, editPassword, inactivateUser } from "../controllers/userController";
import { signIn, signUp, postResetPassword, getNewPassword, postNewPassword } from "../controllers/authController";
import isAuth from "../middleware/authMiddleware";

router.get("/", isAuth, getUsers);
router.get("/roles", isAuth, getRoles);
router.patch("/inactivate", isAuth, inactivateUser);
router.patch("/password", isAuth, editPassword);
router.post("/register", signUp);
router.post("/login", signIn);
router.post("/reset", postResetPassword);
router.get('/reset/:token', getNewPassword);
router.post('/new-password', postNewPassword);

export default router;