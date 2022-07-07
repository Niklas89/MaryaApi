import express from "express";
const router = express.Router();
import isAuth from '../middleware/authMiddleware';


import { getClients, editClient, getBookingByIdClient, getClientById } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);
router.get("/:id", isAuth, getClientById);

router.put("/:id", editClient);

router.post("/sales/", salesAddClient);

router.get("/booking/:id", getBookingByIdClient);

export default router;