import express from "express";
const router = express.Router();


import { getClients, editClient, getBookingByIdClient, getClientById, dateBooking } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);
router.get("/:id", getClientById);

router.put("/:id", editClient);

router.post("/sales/", salesAddClient);

router.get("/booking/:id", getBookingByIdClient);
router.get("/booking/:id/:dateType(future|present|past)/:accepted(true|false)", dateBooking)

export default router;