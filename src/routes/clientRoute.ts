import express from "express";
const router = express.Router();
import checkUser from "../middleware/authMiddleware";


import { getClients, editClient, getBookingByIdClient, getClientById, dateBooking, createClient } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);
router.get("/:id", checkUser, getClientById);

router.put("/:id", editClient);

router.post("/create", checkUser, createClient);
router.post("/sales/", salesAddClient);

router.get("/booking/:id", getBookingByIdClient);
router.get("/booking/:id/:dateType(future|present|past)/:accepted(true|false)", dateBooking)

export default router;