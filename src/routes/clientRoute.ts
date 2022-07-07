import express from "express";
const router = express.Router();
import checkUser from "../middleware/authMiddleware";

import { getClients, editClient, getBookingById, getProfileById } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";

//les get:
router.get("/booking/:dateType(future|present|past)/:accepted(true|false)/", checkUser, getBookingById);
router.get("/profile/", checkUser, getProfileById);
router.get("/", getClients);

//les put:
router.put("/", checkUser, editClient);

//Les post:
router.post("/sales/", salesAddClient);

export default router;