import express from "express";
const router = express.Router();

import { getUsers, getClients, getRoles, editUser, inactivateUser, editPassword,
     editClient } from "../controllers/userController";
import { signIn, signUp } from "../controllers/authController";


router.get("/", getUsers);
router.get("/clients", getClients);
router.get("/roles", getRoles);

router.put("/:id", editUser);
router.put("/client/:id", editClient);
router.patch("/:id", inactivateUser);
router.patch("/password/:id", editPassword);

router.post("/register", signUp);
router.post("/login", signIn)

export default router;