import express from "express";
const router = express.Router();

import { getBookings, getBooking } from "../controllers/bookingController";

router.get("/", getBookings);
router.get("/:id", getBooking);

export default router;