import express from "express";
const router = express.Router();
import isAuth from "../middleware/authMiddleware";


import {
    getBookingById, addBooking, editBookingByIdForClient, bookedByPartner,
    bookingDone, bookingPaid, cancelBooking
} from "../controllers/bookingController";


//Toutes les routes pour les bookings
router.get("/:id", getBookingById);
router.post("/add",isAuth, addBooking);
router.put("/:id", editBookingByIdForClient);
router.patch("/:id", bookedByPartner);
router.patch("/done/:id", bookingDone);
router.patch("/paid/:id", bookingPaid);
router.patch("/cancel/:id", cancelBooking);


export default router;