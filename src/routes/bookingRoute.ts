import express from "express";
const router = express.Router();

import { getBookings, getBookingById, addBooking, editBookingByIdForClient, bookedByPartner, bookingDonne, cancelBooking, deleteBookingById, dateBooking } from "../controllers/bookingController";

//Toutes les routes pour les bookings
router.get("/", getBookings);
router.get("/:dateType(future|present|past)", dateBooking)
router.get("/:id", getBookingById);
router.post("/", addBooking);
router.put("/:id", editBookingByIdForClient);
router.patch("/:id", bookedByPartner);
router.patch("/done/:id", bookingDonne)
router.patch("/cancel/:id", cancelBooking)
router.delete("/:id", deleteBookingById);


export default router;