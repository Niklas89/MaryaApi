import express from "express";
const router = express.Router();

import { getAdminProfile, editAdminProfile, getRecrutedClients, getRecrutedPartners, getClients, getClient,
    addClient, editClient, getPartners, getPartnerProfile, addPartner, editPartner,
     editBooking, cancelBooking, getBooking, getBookings,  inactivateUser,
     getCategories, getCategory, addCategory, editCategory, getServicesByCategory, getService, addService, editService } from "../controllers/adminController";

// clients
router.get("/client/", getRecrutedClients);
router.get("/client/", getClients);
router.get("/client/:id", getClient);
router.put("/client/:id", editClient);
router.post("/client/", addClient);

// partners
router.get("/partner/", getRecrutedPartners);
router.get("/", getPartners);
router.get("/partner/", getPartnerProfile);
router.put("/partner/:id", editPartner);
router.post("/partner/", addPartner);

// bookings
router.put("/booking/:id", editBooking);
router.get("/booking/", getBookings);
router.get("/booking/:id", getBooking);
router.patch("/booking/:id", cancelBooking);

// users
router.patch("/inactivate/:id", inactivateUser);

// admin
router.get("/profile/", getAdminProfile);
router.put("/profile/", editAdminProfile);

// services
router.get("/category/", getCategories);
router.get("/category/:id", getCategory);
router.get("/category/services/:id", getServicesByCategory);
router.get("/category/service/:id", getService);
router.post("/category/", addCategory);
router.post("/category/service/", addService);
router.put("/category/:id", editCategory);
router.put("/category/service/:id", editService);

export default router;