import express from "express";
const router = express.Router();

import { getUsers, getRoles, editUser, inactivateUser, editPassword } from "../controllers/userController";

import { signIn, signUp } from "../controllers/authController";


router.get("/", getUsers);
router.get("/roles", getRoles);

router.put("/:id", editUser);

router.patch("/:id", inactivateUser);
router.patch("/password/:id", editPassword);

router.post("/register", signUp);
router.post("/login", signIn)

export default router;