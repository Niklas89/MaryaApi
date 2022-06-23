import express from "express";
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/add-user", userController.postAddUser);

router.get("/", userController.getUsers);



export default router;