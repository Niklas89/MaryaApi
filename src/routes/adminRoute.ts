import express from "express";
const router = express.Router();
import isAuth from "../middleware/authMiddleware";

import { getAdminProfile, editAdminProfile, getRecrutedClients, getRecrutedPartners, getClients, getClient,
    addClient, editClient, getPartners, getPartnerProfile, addPartner, editPartner,
     editBooking, cancelBooking, getBooking, getBookings,  inactivateUser } from "../controllers/adminController";

// clients
router.get("/client/", isAuth, getRecrutedClients);
router.get("/client/", getClients);
router.get("/client/:id", isAuth, getClient);
router.put("/client/:id", isAuth, editClient);
router.post("/client/", isAuth, addClient);

// partners
router.get("/partner/", isAuth, getRecrutedPartners);
router.get("/", isAuth, getPartners);
router.get("/partner/", isAuth, getPartnerProfile);
router.put("/partner/:id", isAuth, editPartner);
router.post("/partner/", isAuth, addPartner);

// bookings
router.put("/booking/:id", isAuth, editBooking);
router.get("/booking/", getBookings);
router.get("/booking/:id", getBooking);
router.patch("/booking/:id", cancelBooking);

// users
router.patch("/inactivate/:id", isAuth, inactivateUser);

// admin
router.get("/profile/", isAuth, getAdminProfile);
router.put("/profile/", isAuth, editAdminProfile);

export default router;