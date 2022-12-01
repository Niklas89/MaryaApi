import express from "express";
const router = express.Router();
import isAuth from "../middleware/authMiddleware";

import {
  getBookingById,
  addBooking,
  editBookingByIdForClient,
  bookedByPartner,
  bookingDone,
  bookingPaid,
  cancelBooking,
} from "../controllers/bookingController";

//Toutes les routes pour les bookings
router.get("/:id", isAuth, getBookingById);
router.post("/add", isAuth, addBooking);
router.put("/:id", isAuth, editBookingByIdForClient);
router.patch("/:id", isAuth, bookedByPartner);
router.patch("/done/:id", isAuth, bookingDone);
router.patch("/paid/:id", isAuth, bookingPaid);
router.patch("/cancel/:id", isAuth, cancelBooking);

export default router;
