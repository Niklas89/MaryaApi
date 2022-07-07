import express from "express";
const router = express.Router();
import checkUser from "../middleware/authMiddleware";


import { getClients, editClient, getBookingByIdClient, getClientById } from "../controllers/clientController";
import { salesAddClient } from "../controllers/authController";


router.get("/", getClients);
router.get("/:id", checkUser, getClientById);

router.put("/:id", editClient);

router.post("/sales/", salesAddClient);

router.get("/booking/:id", getBookingByIdClient);

export default router;