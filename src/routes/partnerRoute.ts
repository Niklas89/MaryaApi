import express from "express";
import { salesAddPartner } from "../controllers/authController";
import { salesEditPartner, getPartners, getPartnerById, editPersonalInfo, editProfessionalfInfo, editAddress, createPartner, editCategory } from "../controllers/partnerController";
import checkUser from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", getPartners);
router.get("/:id", getPartnerById);
router.post("/create", checkUser, createPartner);
router.post("/sales-add", salesAddPartner);
router.put("/sales-edit/:id", salesEditPartner);
router.patch("/personnal-info", editPersonalInfo);
router.patch("/professional-info", editProfessionalfInfo);
router.patch("/address", editAddress);
router.patch("/category", editCategory);

export default router;