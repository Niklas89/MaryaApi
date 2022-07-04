import express from "express";
const router = express.Router();

import { getUsers, getClients, getPartners, getRoles, editUser, inactivateUser, editPassword,
     editClient, editPartner } from "../controllers/userController";
import { signIn, signUp } from "../controllers/authController";


router.get("/", getUsers);
router.get("/clients", getClients);
router.get("/partners", getPartners);
router.get("/roles", getRoles);

router.put("/:id", editUser);
router.put("/client/:id", editClient);
router.put("/partner/:id", editPartner);
router.patch("/:id", inactivateUser);
router.patch("/password/:id", editPassword);

router.post("/register", signUp);
router.post("/login", signIn)

export default router;