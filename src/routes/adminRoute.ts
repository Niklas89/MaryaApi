import express from "express";
const router = express.Router();

import { getAdminById, editAdmin, getRecrutedClients, getRecrutedPartners } from "../controllers/adminController";

router.get("/:id", getAdminById);
router.get("/", getRecrutedClients);
router.get("/", getRecrutedPartners);

router.put("/", editAdmin);


export default router;