import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import Express, { NextFunction } from "express";
import User from "../types/userType";

const checkUser = (req: Express.Request, res: Express.Response, next: NextFunction) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).send("Accès refusé");
    }
    if (typeof process.env.TOKEN_SECRET === "string") {
        try {
            jwt.verify(token, process.env.TOKEN_SECRET);
            next();
        } catch(err) {
            res.status(400).send("Token invalide");
        }
    }
}

export default checkUser;