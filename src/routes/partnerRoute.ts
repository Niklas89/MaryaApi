import express from "express";

import { getPartners, getPartnerById, editPersonalInfo, editProfessionalfInfo, editAddress, addPartner, editCategory, getBookingById } from "../controllers/partnerController";
import isAuth from "../middleware/authMiddleware";

const router = express.Router();


router.get("/booking/:dateType(future|present|past)", isAuth, getBookingById);
router.get("/", getPartners);
router.get("/profile/", isAuth, getPartnerById);
router.post("/add", isAuth, addPartner);
router.patch("/personnal-info", editPersonalInfo);
router.patch("/professional-info", editProfessionalfInfo);
router.patch("/address", editAddress);
router.patch("/category", editCategory);


export default router;