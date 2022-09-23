import express from "express";
import { checkout } from "../controllers/checkoutController";
const router = express.Router();


router.post("/create-stripe-session", checkout);


export default router;