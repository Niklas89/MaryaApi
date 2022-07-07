import express from "express";
const router = express.Router();
import checkUser from "../middleware/authMiddleware";

import { getAdminById, editAdmin, getRecrutedClients, getRecrutedPartners, getClientById } from "../controllers/adminController";

router.get("/:id", getAdminById);
router.get("/", getRecrutedClients);
router.get("/", getRecrutedPartners);
router.get("/client/:id", checkUser, getClientById);

router.put("/", editAdmin);


export default router;