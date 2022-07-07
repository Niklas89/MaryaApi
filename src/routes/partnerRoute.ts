import express from "express";
const router = express.Router();
import { getPartnerProfile, editPersonalInfo, editProfessionalfInfo, editAddress, addPartner, editCategory, getBookingById } from "../controllers/partnerController";
import isAuth from "../middleware/authMiddleware";

router.get("/booking/:dateType(future|present|past)", isAuth, getBookingById);
router.get("/profile", isAuth, getPartnerProfile);
router.post("/add", isAuth, addPartner);
router.patch("/personnal-info", isAuth, editPersonalInfo);
router.patch("/professional-info", isAuth, editProfessionalfInfo);
router.patch("/address", isAuth, editAddress);
router.patch("/category", isAuth, editCategory);


export default router;