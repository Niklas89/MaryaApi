import express from "express";
const router = express.Router();

import { getBookings, getBookingById, addBooking, editBookingById, bookedByPartner, deleteBookingById } from "../controllers/bookingController";

//Toutes les routes pour les bookings
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/", addBooking);
router.put("/:id", editBookingById);
router.patch("/:id", bookedByPartner);
router.delete("/:id", deleteBookingById);

export default router;