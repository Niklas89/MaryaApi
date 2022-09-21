import express from "express";
const router = express.Router();
import { getUsers, getRoles, editPassword, inactivateUser } from "../controllers/userController";

router.get("/", getUsers);
router.get("/roles", getRoles);
router.patch("/inactivate", inactivateUser);
router.patch("/edit-password", editPassword);

export default router;