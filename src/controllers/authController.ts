import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import Express from "express";
import User from "../types/userType";
import bcrypt from "bcryptjs";

const createToken = (id: number) => {
    if (typeof process.env.TOKEN_SECRET === "string") {
        return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "1 hours" })
    }
};

const signIn = (req: Express.Request, res: Express.Response) => {
    userModel.findOne({ where: { email: req.body.email } })
        .then((user: User) => {
            const auth: boolean = bcrypt.compareSync(req.body.password, user.password);
            if (auth) {
                const token = createToken(user.idUser);
                res.status(201).send(user);
            } else {
                res.status(401).json("Mot de passe incorrect")
            }
        })
        .catch(() => {
            res.status(401).send("Email inconnu");
        });
};

const signUp = (req: Express.Request, res: Express.Response) => {
    userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        idRole: req.body.idRole
    })
        .then((user: User) => {
            res.status(201).json({ user: user.idUser });
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};

export { signIn, signUp };