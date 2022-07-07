import express from "express";
import checkUser from "../middleware/authMiddleware";
import { salesAddPartner } from "../controllers/authController";
import { salesEditPartner, getPartners, getPartnerById, editPersonalInfo, editProfessionalfInfo, editAddress, createPartner, editCategory, getBookingById } from "../controllers/partnerController";
const router = express.Router();

//les get:
router.get("/booking/:dateType(future|present|past)", checkUser, getBookingById);
router.get("/", getPartners);
router.get("/profile/", checkUser, getPartnerById);

//Les put:
router.put("/sales-edit/:id", salesEditPartner);

//Les patch:
router.patch("/personnal-info", editPersonalInfo);
router.patch("/professional-info", editProfessionalfInfo);
router.patch("/address", editAddress);
router.patch("/category", editCategory);

//Les post:
router.post("/create", checkUser, createPartner);
router.post("/sales-add", salesAddPartner);

export default router;