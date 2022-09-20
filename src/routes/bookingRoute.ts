import express from "express";
const router = express.Router();


import {
    getBookingById, addBooking, editBookingByIdForClient, bookedByPartner,
    bookingDone, cancelBooking
} from "../controllers/bookingController";


//Toutes les routes pour les bookings
router.get("/:id", getBookingById);
router.post("/", addBooking);
router.put("/:id", editBookingByIdForClient);
router.patch("/:id", bookedByPartner);
router.patch("/done/:id", bookingDone);
router.patch("/cancel/:id", cancelBooking);


export default router;