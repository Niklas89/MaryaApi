import express from "express";
const router = express.Router();
import { handleRefreshToken } from "../controllers/refreshTokenController";

router.get("/", handleRefreshToken);

export default router;