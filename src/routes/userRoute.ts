import express from "express";
const router = express.Router();

import { getUsers, getPartners, getRoles, editUser, inactivateUser, editPassword,
     editPartner } from "../controllers/userController";
import { signIn, signUp } from "../controllers/authController";


router.get("/", getUsers);
router.get("/partners", getPartners);
router.get("/roles", getRoles);

router.put("/:id", editUser);
router.put("/partner/:id", editPartner);
router.patch("/:id", inactivateUser);
router.patch("/password/:id", editPassword);

router.post("/register", signUp);
router.post("/login", signIn)

export default router;