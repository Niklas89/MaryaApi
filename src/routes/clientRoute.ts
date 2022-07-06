import express from "express";
const router = express.Router();

import { getClients, editClient, getClientById } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);
router.get("/:id", getClientById);

router.put("/:id", editClient);

router.post("/sales/", salesAddClient);

export default router;