import express from "express";
const router = express.Router();

import { getPartnerProfile, editPersonalInfo, editProfessionalfInfo, editAddress, addPartner, getClient, editCategory, getBookingById, getPendingBookings } from "../controllers/partnerController";
import isAuth from "../middleware/authMiddleware";

router.get("/booking/:dateType(future|present|past)", isAuth, getBookingById);
router.get("/profile", isAuth, getPartnerProfile);
router.get("/getBooking", isAuth, getPendingBookings)
router.get("/client/:id", isAuth, getClient);
router.post("/add", isAuth, addPartner);
router.patch("/personnal-info", isAuth, editPersonalInfo);
router.patch("/professional-info", isAuth, editProfessionalfInfo);
router.patch("/address", isAuth, editAddress);
router.patch("/category", isAuth, editCategory);
//router.get("/display-bookings/", isAuth, getPendingBookings)

export default router;