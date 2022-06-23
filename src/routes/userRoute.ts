import express from "express";
const router = express.Router();

import { getUsers } from "../controllers/userController";

//router.post("/add-user", userController.postAddUser);

router.get("/", getUsers);



export default router;