import express from "express";
const router = express.Router();

import { getClients, editClient } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);

router.put("/:id", editClient);

router.post("/salesaddclient/", salesAddClient);

export default router;