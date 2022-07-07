import express from "express";
const router = express.Router();


import {
    getBookingById, addBooking, editBookingByIdForClient, bookedByPartner,
    bookingDone, cancelBooking, dateBooking
} from "../controllers/bookingController";


//Toutes les routes pour les bookings
router.get("/:dateType(future|present|past)/:accepted(true|false)", dateBooking)
router.get("/:id", getBookingById);
router.post("/", addBooking);
router.put("/:id", editBookingByIdForClient);
router.patch("/:id", bookedByPartner);
router.patch("/done/:id", bookingDone);
router.patch("/cancel/:id", cancelBooking);


export default router;