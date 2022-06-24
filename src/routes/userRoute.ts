import express from "express";
const router = express.Router();

import { getUsers, getClients, getPartners, getRoles, editUser, inactivateUser } from "../controllers/userController";
import { signIn, signUp } from "../controllers/authController";


router.get("/", getUsers);
router.get("/clients", getClients);
router.get("/partners", getPartners);
router.get("/roles", getRoles);

router.put("/:id", editUser);
router.put("/delete-user/:id", inactivateUser);

router.post("/register", signUp);
router.post("/login", signIn)

export default router;