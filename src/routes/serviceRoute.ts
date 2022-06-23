import express from "express";
const router = express.Router();

import { getService, getServiceCategory, getServiceType } from "../controllers/serviceController";

router.get("/", getService);
router.get("/category", getServiceCategory);
router.get("/type", getServiceType);

export default router;