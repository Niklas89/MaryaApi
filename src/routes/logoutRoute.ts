import express from "express";
const router = express.Router();
import { logout } from "../controllers/logoutController";

router.get("/", logout);

export default router;