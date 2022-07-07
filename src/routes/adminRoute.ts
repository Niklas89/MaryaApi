import express from "express";
const router = express.Router();
import isAuth from "../middleware/authMiddleware";

import { getAdminProfile, editAdminProfile, getRecrutedClients, getRecrutedPartners, getClient,
    addClient, editClient, addPartner, editPartner, inactivateUser } from "../controllers/adminController";

router.get("/profile/", isAuth, getAdminProfile);
router.get("/client/", isAuth, getRecrutedClients);
router.get("/partner/", isAuth, getRecrutedPartners);
router.get("/client/:id", isAuth, getClient);
router.put("/profile/", isAuth, editAdminProfile);
router.put("/partner/:id", isAuth, editPartner);
router.put("/client/:id", isAuth, editClient);
router.patch("/user/:id", isAuth, inactivateUser);
router.post("/client/", isAuth, addClient);
router.post("/partner/", isAuth, addPartner);


export default router;