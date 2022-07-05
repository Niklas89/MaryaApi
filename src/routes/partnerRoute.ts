import express from "express";
import { editPartnerByCommercial, getPartners } from "../controllers/partnerController";
const router = express.Router();

router.get("/", getPartners)
router.get("/:id", editPartnerByCommercial);

export default router;