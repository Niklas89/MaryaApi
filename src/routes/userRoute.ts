import express from "express";
const router = express.Router();

import { getUsers, getRoles, inactivateUser, editPassword } from "../controllers/userController";
import { signIn, signUp } from "../controllers/authController";
import checkUser from "../middleware/authMiddleware";


router.get("/", getUsers);
router.get("/roles", getRoles);

router.patch("/inactivate", checkUser, inactivateUser);
router.patch("/password", checkUser, editPassword);

router.post("/register", signUp);
router.post("/login", signIn)

export default router;