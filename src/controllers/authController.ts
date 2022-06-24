import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import Express from "express";

const maxAge: string = "2 days";

const createToken = (id: number) => {
    //return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge})
};

const signIn = async (req: Express.Request, res: Express.Response) => {

};

const signUp = async (req: Express.Request, res: Express.Response) => {
    try {
        const user = await userModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            idRole: req.body.idRole
        });
        res.status(201).json({ user: user.idUser });
    } catch (err) {
        res.status(400).send(err);
    }
};

export { signIn, signUp };