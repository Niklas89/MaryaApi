import express from "express";
const router = express.Router();
import isAuth from "../middleware/authMiddleware";

import { getAdminProfile, editAdminProfile, getRecrutedClients, getRecrutedPartners, getClients, getClient,
    addClient, editClient, getPartners, getPartnerProfile, addPartner, editPartner,
     editBooking, cancelBooking, getBooking, getBookings,  inactivateUser,
     getCategories, getCategory, addCategory, editCategory, getServicesByCategory, getService, addService, editService } from "../controllers/adminController";

// clients
router.get("/client/", isAuth, getRecrutedClients);
router.get("/client/", isAuth, getClients);
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
router.get("/booking/", isAuth, getBookings);
router.get("/booking/:id", isAuth, getBooking);
router.patch("/booking/:id", isAuth, cancelBooking);

// users
router.patch("/inactivate/:id", isAuth, inactivateUser);

// admin
router.get("/profile/", isAuth, getAdminProfile);
router.put("/profile/", isAuth, editAdminProfile);

// services
router.get("/category/", isAuth, getCategories);
router.get("/category/:id", isAuth, getCategory);
router.get("/category/services/:id", isAuth, getServicesByCategory);
router.get("/category/service/:id", isAuth, getService);
router.post("/category/", isAuth, addCategory);
router.post("/category/service/", isAuth, addService);
router.put("/category/:id", isAuth, editCategory);
router.put("/category/service/:id", isAuth, editService);

export default router;