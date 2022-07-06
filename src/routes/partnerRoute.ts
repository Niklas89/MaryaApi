import express from "express";
import { salesAddPartner } from "../controllers/authController";
import { salesEditPartner, getPartners, getPartnerById, editPersonalInfo, editProfessionalfInfo, editAddress, createPartner, editCategory } from "../controllers/partnerController";
const router = express.Router();

router.get("/", getPartners);
router.get("/:id", getPartnerById);
router.post("/create", createPartner);
router.post("/sales-add", salesAddPartner);
router.put("/sales-edit/:id", salesEditPartner);
router.patch("/personnal-info/:id", editPersonalInfo);
router.patch("/professional-info/:id", editProfessionalfInfo);
router.patch("/address/:id", editAddress);
router.patch("/category/:id", editCategory);

export default router;