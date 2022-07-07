import express from "express";
const router = express.Router();

import isAuth from "../middleware/authMiddleware";
import { getClients, editClient, getBookingById, getProfileById, addClient } from "../controllers/clientController";

router.get("/booking/:dateType(future|present|past)/:accepted(true|false)/", isAuth, getBookingById);
router.get("/profile/", isAuth, getProfileById);
router.get("/", getClients);
router.put("/", isAuth, editClient);
router.post("/add/", isAuth, addClient);

export default router;