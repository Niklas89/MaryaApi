import express from "express";
const router = express.Router();
import isAuth from "../middleware/authMiddleware";
import { editClient, getClientBooking, getClientProfile, addClient } from "../controllers/clientController";

router.get("/booking/:dateType(future|present|past)/:accepted(true|false)/", isAuth, getClientBooking);
router.get("/profile", isAuth, getClientProfile);
router.put("/", isAuth, editClient);
router.post("/add/", isAuth, addClient);


export default router;