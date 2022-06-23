import express from "express";
const router = express.Router();

import { getUsers, getClients, getPartners, getRoles } from "../controllers/userController";

//router.post("/add-user", userController.postAddUser);

router.get("/", getUsers);
router.get("/clients", getClients);
router.get("/partners", getPartners);
router.get("/roles", getRoles);



export default router;