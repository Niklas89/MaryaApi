import express from "express";
const router = express.Router();

import { getBookings, getBookingById, addBooking, editBookingByIdForClient, bookedByPartner, 
    bookingDonne, cancelBooking, deleteBookingById, editBookingByIdForAdmin } 
    from "../controllers/bookingController";

//Toutes les routes pour les bookings
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/", addBooking);
router.put("/admin/:id", editBookingByIdForAdmin);
router.put("/:id", editBookingByIdForClient);
router.patch("/:id", bookedByPartner);
router.patch("/done/:id", bookingDonne)
router.patch("/cancel/:id", cancelBooking)
router.delete("/:id", deleteBookingById);

export default router;