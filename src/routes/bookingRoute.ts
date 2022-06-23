import express from "express";
const router = express.Router();

import { getBookings } from "../controllers/bookingController";

router.get("/", getBookings);
//router.get("/id", getBookingId);

export default router;