import express from "express";
import { getPartners, getPartnerById, editPersonalInfo, editProfessionalfInfo, editAddress, addPartner, editCategory } from "../controllers/partnerController";
import verifyToken from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", getPartners);
router.get("/:id", getPartnerById);
router.post("/create", verifyToken, addPartner);
router.patch("/personnal-info", editPersonalInfo);
router.patch("/professional-info", editProfessionalfInfo);
router.patch("/address", editAddress);
router.patch("/category", editCategory);

export default router;