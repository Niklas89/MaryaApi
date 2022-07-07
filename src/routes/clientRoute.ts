import express from "express";
const router = express.Router();
import checkUser from "../middleware/authMiddleware";

import { getClients, editClient, getBookingById, getProfileById, addClient } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";

//les get:
router.get("/booking/:dateType(future|present|past)/:accepted(true|false)/", checkUser, getBookingById);
router.get("/profile/", checkUser, getProfileById);
router.get("/", getClients);

//les put:
router.put("/", checkUser, editClient);

// les post:
router.post("/add/", checkUser, addClient);
router.post("/sales/", salesAddClient);

export default router;