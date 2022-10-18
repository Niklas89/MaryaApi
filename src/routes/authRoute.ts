import express from "express";
const router = express.Router();
import { signIn, signUpClient, postResetPassword, getNewPassword, postNewPassword, signUpPartner } from "../controllers/authController";

router.post("/client/register", signUpClient);
router.post("/partner/register", signUpPartner);
router.post("/login", signIn);
router.post("/reset", postResetPassword);
router.get('/reset/:token', getNewPassword);
router.post('/new-password', postNewPassword);

export default router;