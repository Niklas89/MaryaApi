import express from "express";
const router = express.Router();
import checkUser from "../middleware/authMiddleware";


import { getClients, editClient, getBookingByIdClient, getProfileById, dateBooking } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);
router.get("/", checkUser, getProfileById);

router.put("/:id", editClient);

router.post("/sales/", salesAddClient);

router.get("/booking/:id", getBookingByIdClient);
router.get("/booking/:id/:dateType(future|present|past)/:accepted(true|false)", dateBooking)

export default router;