import express from "express";
const router = express.Router();

import { getClients, editClient, getBookingByIdClient } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);

router.put("/:id", editClient);

router.post("/salesadd/", salesAddClient);

router.get("/booking/:id", getBookingByIdClient);

export default router;